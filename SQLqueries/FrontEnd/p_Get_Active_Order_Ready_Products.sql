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
	EXEC p_Get_Active_Order_Ready_Products '{"orderId" : "1"}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Active_Order_Ready_Products')
	DROP PROCEDURE [dbo].p_Get_Active_Order_Ready_Products
GO

CREATE PROCEDURE p_Get_Active_Order_Ready_Products 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT

AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @orderProductStatusRId INT, @BusinessId INT
	SET @orderProductStatusRId = 3  --'Ready'
	
	DECLARE @orderId INT

	SELECT @orderId = orderId
	FROM OPENJSON(@JSON) 
	WITH (orderId INT );
	
	;WITH selected_order AS
	(
		SELECT orderId, orderDateTime, [addressId] FROM [Order] WHERE orderId = @orderId
	),
	pickup_locations AS
	(
			SELECT so.orderId, b.businessId, B.addressId
			FROM selected_order so
			INNER JOIN OrderProduct OP ON OP.orderId = so.orderId AND [orderProductStatusId] = @orderProductStatusRId
			INNER JOIN Product P ON P.productId = OP.productId
			INNER JOIN Business B ON B.businessId = p.businessId
			GROUP BY  so.orderId, b.businessId, B.addressId
	)
	SELECT so.orderId, so.orderDateTime, oa.locations, so.addressId [dropOfLocation]
	FROM selected_order so
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
						c.businessId ,c.addressId
					FROM
						pickup_locations c
					WHERE
						c.orderId = h.orderId
						FOR JSON PATH
					) AS Locations
				) d	
	) oa ON so.orderId = oa.orderId
	ORDER BY orderDateTime, so.orderid
	FOR JSON PATH
	
	SET @Error = 0
END
GO