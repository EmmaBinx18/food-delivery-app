SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-28
-- Description:	Get products ready in order with the pickup locations
-- 
-- Usage: 
 /*
    DECLARE @Error int 
	EXEC p_Track_Order '{"orderId" : 3}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
*/ 
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Track_Order')
	DROP PROCEDURE [dbo].p_Track_Order
GO

CREATE PROCEDURE p_Track_Order 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT

AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @orderProductStatusRId INT, @BusinessId INT
	--SET @orderProductStatusRId = 3  --'Ready'
	
	DECLARE @orderId INT

	SELECT @orderId = orderId
	FROM OPENJSON(@JSON) 
	WITH (orderId INT );
	
	;WITH selected_order AS
	(
		--SELECT orderId, orderDateTime, [addressId] FROM [Order] WHERE orderId = @orderId
		SELECT orderId, orderDateTime,  A.[addressId], A.[address], JSON_QUERY(CONCAT('[',A.LatLong.Lat,',',A.LatLong.Long,  ']')) [coordinates] , O.deliveryId
		FROM [Order] O
		INNER JOIN [Address] A  ON A.addressId = O.addressId
		WHERE orderId = @orderId

	),
	pickup_locations AS
	(
			SELECT ao.orderId, B.businessId, B.[name], B.addressId
			FROM selected_order ao
			INNER JOIN OrderProduct OP ON OP.orderId = ao.orderId
			INNER JOIN Product P ON P.productId = OP.productId
			INNER JOIN Business B ON B.businessId = P.businessId
			GROUP BY  ao.orderId, b.businessId, B.[name], B.addressId
	)
	SELECT ao.orderId, ao.orderDateTime,  ao.addressId, ao.coordinates, ao.[address], oa.locations, CASE WHEN T.LatLong.Lat IS NOT NULL THEN JSON_QUERY(CONCAT('[',T.LatLong.Lat,',',T.LatLong.Long,  ']')) ELSE null END [driverCordinates]
	FROM selected_order ao
	INNER JOIN 
	(
	
			SELECT
				OrderId,
				JSON_QUERY(Locations,'$') AS [locations]
			FROM
				selected_order h
				CROSS APPLY
				(
				SELECT 
					(
					SELECT  
						c.[Name] [businessName], c.addressId, A.[address], JSON_QUERY(CONCAT('[',A.LatLong.Lat,',',A.LatLong.Long,  ']')) [coordinates]
					FROM
						pickup_locations c
					INNER JOIN [Address] A 
						ON A.addressId = c.addressId
					WHERE
						c.orderId = h.orderId
						FOR JSON PATH
					) AS Locations
				) d	
	) oa ON ao.orderId = oa.orderId
	LEFT OUTER JOIN Delivery D ON D.deliveryId = ao.deliveryId
	LEFT OUTER JOIN Tracking T ON T.deliveryId = D.deliveryId
	ORDER BY orderDateTime, ao.orderid
	FOR JSON PATH
	
	SET @Error = 0
END
GO