SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Create a user via JSON string on the Feed Me web application
-- 
-- Usage:
 --SAMPLE JSON:
 --{ 
 --   "userId": "string", 
 --   "firstname": "string", 
 --   "lastname" : "string", 
 --   "phone": "string", 
 --   "email": "string"
 --} 
 /*
    DECLARE @Error int 
	EXEC p_Create_Update_User '{ "userId" : "uniqueidentifier", "firstname" : "Susan1", "lastname" : "van Zyl", "phone" : "0794920995", "email" : "susan0995@gmail.com"  }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [User]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Create_Update_User')
	DROP PROCEDURE [dbo].[p_Create_Update_User]
GO

CREATE PROCEDURE p_Create_Update_User 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	
	DECLARE	@userId VARCHAR(128), 
			@firstname NVARCHAR(100), 
			@lastname NVARCHAR(100), 
			@phone  NVARCHAR(15), 
			@email VARCHAR(255)

		BEGIN TRY
			SELECT @userId = userId,  @firstname= firstname, @lastname=lastname, @phone=phone, @email=email
			FROM OPENJSON(@JSON)
			WITH (userId VARCHAR(128), firstname NVARCHAR(100),lastname NVARCHAR(100), phone  NVARCHAR(15), email VARCHAR(255))
			
			IF EXISTS (SELECT userId FROM [User] WHERE userId = @userId)
				BEGIN
					UPDATE [User]
					SET [firstname] = @firstname,
						[lastname] = @lastname,
						[phone] = @phone,
						[Email] = @email
					WHERE userId = @userId
				END
			ELSE
				BEGIN
					INSERT INTO [User] (userId, [firstname], lastname, phone, email)
					VALUES (@userId, @firstname, @lastname, @phone, @email)
				END	
					
			SET @Error = 0
			SELECT @userId [userId] , 1 [success] , NULL [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
		END TRY

		BEGIN CATCH
			EXEC p_Insert_Error @Error OUTPUT
			SELECT @userId [userId], 0 [success] , @Error [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
		END CATCH
END
GO

