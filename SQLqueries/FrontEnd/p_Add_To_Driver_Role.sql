
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
	EXEC p_Add_To_Driver_Role '{ "userId" : "driver_uid", "addressId":1 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Role]
	SELECT * FROM [DriverAddress]
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
		DECLARE @RoleDId INT, @userId VARCHAR(128), @addressId INT
		SELECT @RoleDId = 2  --driver roleid

		SELECT @userId = userId, @addressId = addressId
		FROM OPENJSON(@JSON)
		WITH (userId VARCHAR(128), addressId INT)

		INSERT INTO [UserRole]
		VALUES (@userId, @RoleDId)

		INSERT INTO [DriverAddress]
		VALUES (@userId, @addressId)

		SET @Error = 0
		SELECT 1 [success] , NULL [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END TRY
	BEGIN CATCH
		EXEC p_Insert_Error @Error OUTPUT
		SELECT 0 [success] , @Error [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END CATCH
END
GO
