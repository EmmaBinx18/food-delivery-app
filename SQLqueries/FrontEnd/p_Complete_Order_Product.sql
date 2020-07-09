SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-27
-- Description:	Complete Order Product ; Expects productId, orderId; Returns affected rowcount 
-- 
-- Usage: 
 /*
    DECLARE @Error int 
	EXEC p_Complete_Order_Product '{ "productId" : 1, "orderId" : 1}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [OrderProduct]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Complete_Order_Product')
	DROP PROCEDURE [dbo].p_Complete_Order_Product
GO

CREATE PROCEDURE p_Complete_Order_Product 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT

AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		DECLARE @OrderProductStatusR INT, @BusinessId INT, @productId INT, @orderId INT
		SET @OrderProductStatusR = 3 -- 'Ready'

		SELECT @productId = productId, @orderId = orderId
		FROM OPENJSON(@JSON)
		WITH (productId INT, orderId INT)

		UPDATE [OrderProduct]
			SET OrderProductStatusId = @OrderProductStatusR,
				[orderItemReady] = GETDATE()
		WHERE productId = @productId AND  orderId = @orderId 

		--Check if all items are ready in particular order id
		DECLARE @OrderStatusPId INT,@OrderStatusRId INT, @outstandingProducts INT
		SET @OrderStatusRId = 3 -- 'Delivery_in_progress';

		;WITH selected_order AS
		(
			SELECT orderId, orderDateTime FROM [Order] WHERE orderId = @orderId 
		)
		SELECT @outstandingProducts =  COUNT(*)
		FROM selected_order ao
		INNER JOIN OrderProduct OP ON OP.orderId = ao.orderId AND  OrderProductStatusId <> @OrderProductStatusR  --there should not be any Picked_up items in this stage

		IF (@outstandingProducts = 0)
		BEGIN
			UPDATE [Order]
			SET OrderStatusId = @OrderStatusRId
			WHERE orderId = @orderId 
		END

		SET @Error = 0
		SELECT  1 [success] , NULL [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END TRY
	BEGIN CATCH
		EXEC p_Insert_Error @Error OUTPUT
		SELECT 0 [success] , @Error [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END CATCH
END
GO