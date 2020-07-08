SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-27
-- Description:	Get products in active orders for a given business id
-- 
-- Usage: 
 /*
    DECLARE @Error int 
	EXEC p_Get_Active_Order_Products '{ "businessId" : 1}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [OrderProduct]
	select * from [business]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Active_Order_Products')
	DROP PROCEDURE [dbo].p_Get_Active_Order_Products
GO

CREATE PROCEDURE p_Get_Active_Order_Products 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT

AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @OrderStatusPId INT, @BusinessId INT
	SET @OrderStatusPId = 2 -- 'Products_not_ready'

	SELECT @businessId = businessId
	FROM OPENJSON(@JSON)
	WITH (businessId INT);

	WITH available_orders AS
	(
		SELECT orderId, orderDateTime FROM [Order] WHERE [OrderStatusId] = @OrderStatusPId
	)
	SELECT ao.OrderId, p.productId , OP.quantity, OP.orderProductStatusId, p.[Name] , OP.orderItemStarted, OP.OrderItemReady
	FROM available_orders ao
	INNER JOIN OrderProduct OP ON OP.orderId = ao.orderId
	INNER JOIN Product P ON P.productId = OP.productId
	WHERE P.businessId = @businessId
	ORDER BY ao.orderDateTime ASC, ao.OrderId
	FOR JSON PATH
	
	SET @Error = 0
END
GO