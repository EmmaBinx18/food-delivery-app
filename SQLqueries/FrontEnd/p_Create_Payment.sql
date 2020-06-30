
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-23
-- Description:	Add Address
-- Usage : 
 /*
    DECLARE @Error int 
	EXEC p_Create_Payment '{ "paymentTypeid" : 1, "amount" : 1234, "orderId" : 1}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Payment]
*/
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Create_Payment')
	DROP PROCEDURE [dbo].p_Create_Payment
GO

CREATE PROCEDURE p_Create_Payment 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRANSACTION
		BEGIN TRY
			DECLARE @paymentId INT,
					@paymentTypeid INT,
					@amount DECIMAL(9,2),
					@orderId INT,
					@orderStatusId INT

			SELECT @orderId = orderId, @paymentTypeid=paymentTypeid, @amount = amount
			FROM OPENJSON(@JSON)
			WITH (orderId INT, paymentTypeid INT,amount DECIMAL(9,2) )
			
			INSERT INTO [Payment]
			VALUES (@paymentTypeid, GETDATE(),@amount,@orderId )

			SET @paymentId = SCOPE_IDENTITY()
			
			SELECT @orderStatusId = orderStatusId FROM [OrderStatus] WHERE [Name] LIKE 'Products_not_ready'

			UPDATE [Order] 
			SET orderStatusId = @orderStatusId
			WHERE orderId =	@orderId 	

			SET @Error = 0 
			SELECT @paymentId [paymentId] , 1 [success] , NULL [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
			COMMIT
		END TRY
		BEGIN CATCH
			ROLLBACK
			EXEC p_Insert_Error @Error OUTPUT
			SELECT null [paymentId], 0 [success] , @Error [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
		END CATCH

END
GO

