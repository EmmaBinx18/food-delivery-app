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
	EXEC p_Create_Update_Business '{ "businessId" : -1, "name": "My Business", "addressId" : 1,  "categoryId" : 1, "userId" : "chef_uid" }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
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
				@operationalStatusId INT,
				@userId VARCHAR(128)

				SELECT @businessId = businessId,  @name=[name], @categoryId=categoryId, @addressId = addressId, @userId = userId
				FROM OPENJSON(@JSON)
				WITH (businessId int, [name] NVARCHAR(100),categoryId INT,addressId INT, userId VARCHAR(128))

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
				    DECLARE @RoleCId INT;
					SELECT @RoleCId = roleID FROM [Role] WHERE [Name] LIKE 'Home_Chef'

					SET @OperationalStatusId = (SELECT operationalStatusId FROM OperationalStatus WHERE [Name] LIKE 'Pending_Approval')
					INSERT INTO [Business] ( [Name], CategoryId, AddressId, OperationalStatusId)
					VALUES ( @name, @categoryId, @addressId, 1)

					SET @businessId = SCOPE_IDENTITY()

					INSERT INTO [BusinessUser] 
					VALUES (@userId,@businessId)

					INSERT INTO [UserRole] 
					VALUES (@userId, @RoleCId)
				END	
					
				SET @Error = 0
				SELECT @businessId [businessId] , 1 [success] , NULL [error] FOR JSON PATH, INCLUDE_NULL_VALUES 

				COMMIT
			END TRY

			BEGIN CATCH
				ROLLBACK
				EXEC p_Insert_Error @Error OUTPUT
				SELECT null [businessId] , 0 [success] , @Error [error] FOR JSON PATH, INCLUDE_NULL_VALUES 

			END CATCH
END
GO



 
