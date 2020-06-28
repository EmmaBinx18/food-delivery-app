SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Create a business via JSON string on the Feed Me web application
-- 
-- Usage:
-- SAMPLE JSON:
-- { 
--    "businessId": int, 
--    "name": "string", 
--    "addressId" : int, 
--    "categoryId": int
-- } 
 /*
    DECLARE @Error int 
	EXEC p_Create_Update_Business '{ "businessId" : -1, "name": "My Business", "addressId" : 1,  "categoryId" : 1 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Business]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Create_Update_Business')
	DROP PROCEDURE [dbo].[p_Create_Update_Business]
GO

CREATE PROCEDURE p_Create_Update_Business 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	
		BEGIN TRANSACTION 
			BEGIN TRY
			
				DECLARE	@businessId INT, 
				@name NVARCHAR(100), 
				@categoryId INT, 
				@addressId INT,
				@operationalStatusId INT

				SELECT @businessId = businessId,  @name=[name], @categoryId=categoryId, @addressId = addressId
				FROM OPENJSON(@JSON)
				WITH (businessId int, [name] NVARCHAR(100),categoryId INT,addressId INT)

				IF EXISTS (SELECT businessId FROM [Business] WHERE businessId = @businessId)
				BEGIN
					UPDATE [Business]
					SET [name] = @name, 
						categoryId= @categoryId, 
						addressId = @addressId
					WHERE businessId = @businessId
				END
				ELSE
				BEGIN
					SET @OperationalStatusId = (SELECT operationalStatusId FROM OperationalStatus WHERE [Name] LIKE 'Pending_Approval')
					INSERT INTO [Business] ( [Name], CategoryId, AddressId, OperationalStatusId)
					VALUES ( @name, @categoryId, @addressId, 1)
				END	
					
				SET @Error = 0
				COMMIT
			END TRY

			BEGIN CATCH
				ROLLBACK
				EXEC p_Insert_Error @Error OUTPUT
			END CATCH
END
GO



 
