
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
	EXEC p_Add_To_Role 'admin_uid', 1, @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [UserRole]
*/
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Add_To_Role')
	DROP PROCEDURE [dbo].[p_Add_To_Role]
GO

CREATE PROCEDURE p_Add_To_Role 
	@UserId VARCHAR(128), 
	@RoleId INT,
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		IF EXISTS (SELECT * FROM [UserRole] WHERE userId = @UserId)
			BEGIN
				UPDATE [UserRole] 
				SET RoleId = @RoleId
				WHERE UserId = @UserId
			END
		ELSE
			BEGIN
				INSERT INTO [UserRole]
				VALUES (@UserId, @RoleId)
			END
		SET @Error = 0
	END TRY
	BEGIN CATCH
		EXEC p_Insert_Error @Error OUTPUT
	END CATCH
END
GO
