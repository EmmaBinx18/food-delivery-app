
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
	EXEC p_Remove_User_Role '{ "userId" : "driver_uid"}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [UserRole]
*/
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Remove_User_Role')
	DROP PROCEDURE [dbo].p_Remove_User_Role
GO

CREATE PROCEDURE p_Remove_User_Role 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		DECLARE @userId VARCHAR(128)
		SELECT @userId = userId
		FROM OPENJSON(@JSON)
		WITH (userId VARCHAR(128))

		DECLARE @roleId INT = (SELECT roleId FROM [UserRole] WHERE [UserId]  = @userId)

		DELETE FROM [UserRole] WHERE [UserId]  = @userId

		IF (@roleId =3)
		BEGIN
			DELETE FROM [BusinessUser] WHERE [UserId]  = @userId
		END

		IF (@roleId =2)
		BEGIN
			DELETE FROM [DriverAddress] WHERE [UserId]  = @userId
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
