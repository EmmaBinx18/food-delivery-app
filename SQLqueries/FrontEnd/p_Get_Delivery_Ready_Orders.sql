SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-27
-- Description:	Get orders ready for delivery with the pickup locations
-- 
-- Usage: 
 /*
    DECLARE @Error int 
	EXEC p_Get_Delivery_Ready_Orders '{}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [OrderProduct]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Delivery_Ready_Orders')
	DROP PROCEDURE [dbo].p_Get_Delivery_Ready_Orders
GO

CREATE PROCEDURE p_Get_Delivery_Ready_Orders 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT

AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @OrderStatusRId INT, @BusinessId INT
	SET @OrderStatusRId = 3 ;--'Waiting_for_driver';

	WITH available_orders AS
	(
		SELECT orderId, orderDateTime, A.[addressId], A.[address], JSON_QUERY(CONCAT('[',A.LatLong.Lat,',',A.LatLong.Long,  ']')) [coordinates] 
		FROM [Order] O
		INNER JOIN [Address] A  ON A.addressId = O.addressId
		WHERE [OrderStatusId] = @OrderStatusRId
	),
	pickup_locations AS
	(
			SELECT ao.orderId, B.businessId, B.[name], B.addressId
			FROM available_orders ao
			INNER JOIN OrderProduct OP ON OP.orderId = ao.orderId
			INNER JOIN Product P ON P.productId = OP.productId
			INNER JOIN Business B ON B.businessId = P.businessId
			
			GROUP BY  ao.orderId, b.businessId, B.[name], B.addressId

	)
	SELECT ao.orderId, ao.orderDateTime, ao.addressId, ao.coordinates, ao.[address], oa.locations
	FROM available_orders ao
	INNER JOIN 
	(
	
			SELECT
				OrderId,
				JSON_QUERY(Locations,'$') AS [locations]
			FROM
				available_orders h
				CROSS APPLY
				(
				SELECT 
					(
					SELECT  
						c.businessId , c.addressId, A.[address], JSON_QUERY(CONCAT('[',A.LatLong.Lat,',',A.LatLong.Long,  ']')) [coordinates] 
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
	ORDER BY orderDateTime, ao.orderid
	FOR JSON PATH
	
	SET @Error = 0
END
GO
