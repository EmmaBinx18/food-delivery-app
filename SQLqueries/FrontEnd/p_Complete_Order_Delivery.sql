SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-27
-- Description:	Deliver the order ; Expects orderId
-- 
-- Usage: 
 /*
    DECLARE @Error int 
	EXEC p_Complete_Order_Delivery '{ "orderId" : 1, "kmTraveled" : 20.582 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [delivery], orderstatus

*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Complete_Order_Delivery')
	DROP PROCEDURE [dbo].p_Complete_Order_Delivery
GO

CREATE PROCEDURE p_Complete_Order_Delivery 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT

AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRANSACTION
		BEGIN TRY
			DECLARE @OrderStatusDId INT, @orderId INT,  @driverId VARCHAR(128), @deliveryStatusPId INT, @deliveryId INT, @kmTraveled DECIMAL(13,9)
			SET @OrderStatusDId = 5  --'Done';
			SET @deliveryStatusPId = 3 --'Delivered';

			SELECT @orderId = orderId, @kmTraveled = kmTraveled
			FROM OPENJSON(@JSON)
			WITH (orderId INT,kmTraveled DECIMAL(13,9));
		
			DECLARE @kmTraveledINT INT = CAST (CEILING(@kmTraveled) AS INT)

			SET @deliveryId = (SELECT D.deliveryId FROM [Delivery] D 	INNER JOIN [Order] O ON O.DeliveryId = D.deliveryId WHERE O.orderId = @orderId)
			
			UPDATE	[Delivery]
				SET EndTime = GETDATE(),
					kmTraveled = @kmTraveledINT,
					deliveryStatusId = @deliveryStatusPId
			WHERE deliveryId = @deliveryId

			UPDATE [Order] 
				SET OrderStatusId = @OrderStatusDId
			WHERE orderId = @orderId

			DELETE FROM Tracking WHERE deliveryId = @deliveryId

			SET @Error = 0
			SELECT 1 [success] , NULL [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
			COMMIT

		END TRY
		BEGIN CATCH
			ROLLBACK
			EXEC p_Insert_Error @Error OUTPUT
			SELECT 0 [success] , @Error [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
		END CATCH
	
END
GO