
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
	EXEC p_Add_To_Driver_Role '{ "userId" : "driver_uid"}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [UserRole]
*/
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Add_To_Driver_Role')
	DROP PROCEDURE [dbo].p_Add_To_Driver_Role
GO

CREATE PROCEDURE p_Add_To_Driver_Role 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		DECLARE @RoleDId INT, @userId VARCHAR(128)
		SELECT @RoleDId = roleId FROM [Role] WHERE [Name] LIKE 'Driver'

		SELECT @userId = userId
		FROM OPENJSON(@JSON)
		WITH (userId VARCHAR(128))

		INSERT INTO [UserRole]
		VALUES (@userId, @RoleDId)

		SET @Error = 0
	END TRY
	BEGIN CATCH
		EXEC p_Insert_Error @Error OUTPUT
	END CATCH
END
GO
