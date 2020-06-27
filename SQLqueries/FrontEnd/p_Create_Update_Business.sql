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
--    "id": int, 
--    "name": "string", 
--    "addressId" : int, 
--    "categoryId": int
-- } 
 /*
    DECLARE @Error int 
	EXEC p_Create_Update_Business '{ "id" : -1, "name": "My Business", "addressId" : 2,  "categoryId" : 1 }', @Error OUTPUT
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
			
				DECLARE	@id INT, 
				@name NVARCHAR(100), 
				@categoryId INT, 
				@addressId INT,
				@operationalStatusId INT

				SELECT @id = id,  @name=[name], @categoryId=categoryId, @addressId = addressId
				FROM OPENJSON(@JSON)
				WITH (id int, [name] NVARCHAR(100),categoryId INT,addressId INT)

				IF EXISTS (SELECT id FROM [Business] WHERE id = @id)
				BEGIN
					UPDATE [Business]
					SET [name] = @name, 
						categoryId= @categoryId, 
						addressId = @addressId
					WHERE id = @id
				END
				ELSE
				BEGIN
					SET @OperationalStatusId = (SELECT id FROM OperationalStatus WHERE [Name] LIKE 'Pending_Approval')
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



 
