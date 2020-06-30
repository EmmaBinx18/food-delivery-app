SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-27
-- Description:	Pick up Order Product ; Expects productId, orderId; Returns affected rowcount 
-- 
-- Usage: 
 /*
    DECLARE @Error int 
	EXEC p_Pick_Up_Order_Product '{ "productId" : 2, "orderId" : 1}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [OrderProduct]
	SELECT * FROM [Order] O JOIN [Delivery] D ON D.DeliveryId = O.DeliveryId
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Pick_Up_Order_Product')
	DROP PROCEDURE [dbo].p_Pick_Up_Order_Product
GO

CREATE PROCEDURE p_Pick_Up_Order_Product 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT

AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		DECLARE @OrderProductStatusPId INT,  @productId INT, @orderId INT
		SELECT @OrderProductStatusPId = OrderProductStatusId FROM OrderProductStatus WHERE [Name] LIKE 'Picked_up'

		SELECT @productId = productId, @orderId = orderId
		FROM OPENJSON(@JSON)
		WITH (productId INT, orderId INT)

		UPDATE [OrderProduct]
			SET OrderProductStatusId = @OrderProductStatusPId,
				[orderItemReady] = GETDATE()
		WHERE productId = @productId AND  orderId = @orderId 

		--Check if all items are picked up in particular order id
		DECLARE @DeliveryStatusOId INT, @outstandingProducts INT
		SELECT @DeliveryStatusOId = DeliveryStatusId FROM [DeliveryStatus] WHERE [Name] LIKE 'On_its_way';

		WITH selected_order AS
		(
			SELECT orderId, orderDateTime FROM [Order] WHERE orderId = @orderId 
		)
		SELECT @outstandingProducts =  COUNT(*)
		FROM selected_order ao
		INNER JOIN OrderProduct OP ON OP.orderId = ao.orderId AND  OrderProductStatusId <> @OrderProductStatusPId
	
		print @outstandingProducts

		IF (@outstandingProducts = 0)
		BEGIN
			UPDATE 
				D
			SET D.DeliveryStatusId = @DeliveryStatusOId
			FROM [Delivery] D
			INNER JOIN [Order] O ON O.deliveryId = D.deliveryId  AND O.orderId = @orderId 
		END

		SET @Error = 0
		SELECT 1 [success] , NULL [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END TRY
	BEGIN CATCH
		EXEC p_Insert_Error @Error OUTPUT
		SELECT 0 [success] , @Error [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END CATCH
END
GO