
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-07-07
-- Description:	Updates availabilitystatus id for given product id
-- Usage : 
 /*
    DECLARE @Error int 
	EXEC p_Update_Product_Status '{  "productId": -1,  "availabilityStatusId": 2}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Product]
*/
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Update_Product_Status')
	DROP PROCEDURE [dbo].[p_Update_Product_Status]
GO

CREATE PROCEDURE p_Update_Product_Status 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		DECLARE @productId INT,
				@availabilityStatusId INT
		
		SELECT @productId = productId, @availabilityStatusId =availabilityStatusId
		FROM OPENJSON(@JSON)
		WITH (productId INT, availabilityStatusId INT)

		UPDATE [Product]
		SET	[availabilityStatusId] = @availabilityStatusId
		WHERE productId = @productId
			
		SET @Error = 0 
		SELECT @productId [productId] , 1 [success] , NULL [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END TRY
	BEGIN CATCH
		EXEC p_Insert_Error @Error OUTPUT
		SELECT @productId [productId] , 0 [success] , @Error [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END CATCH

END
GO



