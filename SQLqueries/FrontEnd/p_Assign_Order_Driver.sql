SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-27
-- Description:	Assign the given driver to the order ; Expects productId, orderId; Returns affected rowcount 
-- 
-- Usage: 
 /*
    DECLARE @Error int 
	EXEC p_Assign_Order_Driver '{ "orderId" : 1, "driverId" : "driver_uid"}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [OrderProduct]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Assign_Order_Driver')
	DROP PROCEDURE [dbo].p_Assign_Order_Driver
GO

CREATE PROCEDURE p_Assign_Order_Driver 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT

AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRANSACTION
		BEGIN TRY
			DECLARE @OrderStatusDId INT, @orderId INT,  @driverId VARCHAR(128), @deliveryStatusPId INT, @deliveryId INT
			SELECT @OrderStatusDId = OrderStatusId FROM OrderStatus WHERE [Name] LIKE 'Delivery_In_Progess';
			SELECT @deliveryStatusPId = deliveryStatusId FROM deliveryStatus WHERE [Name] LIKE  'Picking_up_items';

			SELECT @orderId = orderId, @driverId = driverId
			FROM OPENJSON(@JSON)
			WITH (orderId INT, driverId VARCHAR(128));
		
			INSERT INTO Delivery (startTime, [deliveryStatusId], [driverId])
			VALUES(GETDATE(),@deliveryStatusPId,@driverId)

			SET @deliveryId = SCOPE_IDENTITY()

			UPDATE [Order]
				SET orderStatusId = @OrderStatusDId,
					deliveryId = @deliveryId
			WHERE orderId = @orderId

			COMMIT
			SET @Error = 0
			SELECT 1 [success] , NULL [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
		END TRY
		BEGIN CATCH
			ROLLBACK
			EXEC p_Insert_Error @Error OUTPUT
			SELECT 0 [success] , @Error [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
		END CATCH
	
END
GO