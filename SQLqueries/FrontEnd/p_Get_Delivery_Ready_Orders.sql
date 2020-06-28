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
	SELECT @OrderStatusRId = OrderStatusId FROM [OrderStatus] WHERE [Name] LIKE 'Waiting_for_driver';

	WITH available_orders AS
	(
		SELECT orderId, orderDateTime, [addressId] FROM [Order] WHERE [OrderStatusId] = @OrderStatusRId
	),
	pickup_locations AS
	(
			SELECT ao.orderId, b.businessId, B.addressId
			FROM available_orders ao
			INNER JOIN OrderProduct OP ON OP.orderId = ao.orderId
			INNER JOIN Product P ON P.productId = OP.productId
			INNER JOIN Business B ON B.businessId = p.businessId
			GROUP BY  ao.orderId, b.businessId, B.addressId

	)
	SELECT ao.orderId, ao.orderDateTime, oa.locations, ao.addressId [dropOfLocation]
	FROM available_orders ao
	INNER JOIN 
	(
	
			SELECT
				OrderId,
				JSON_QUERY(Cars,'$') AS [locations]
			FROM
				available_orders h
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
					) AS Cars
				) d	
	) oa ON ao.orderId = oa.orderId
	ORDER BY orderDateTime, ao.orderid
	FOR JSON PATH
	
	SET @Error = 0
END
GO