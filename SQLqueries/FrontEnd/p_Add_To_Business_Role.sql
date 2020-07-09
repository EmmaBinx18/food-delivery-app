
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-23
-- Description:	Add User To Role
-- Usage: 
 /*
    DECLARE @Error int 
	EXEC p_Add_To_Business_Role '{ "userId" : "user_uid", "businessId":2 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [UserRole]
	SELECT * FROM [BusinessUser]
*/
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Add_To_Business_Role')
	DROP PROCEDURE [dbo].p_Add_To_Business_Role
GO

CREATE PROCEDURE p_Add_To_Business_Role 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRANSACTION
		BEGIN TRY
			DECLARE @RoleDId INT, @userId VARCHAR(128), @businessId INT
			SELECT @RoleDId = 3  --homechef roleid

			SELECT @userId = userId, @businessId = businessId
			FROM OPENJSON(@JSON)
			WITH (userId VARCHAR(128), businessId INT)

			INSERT INTO [UserRole]
			VALUES (@userId, @RoleDId)

			INSERT INTO [BusinessUser]
			VALUES (@userId, @businessId)

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
