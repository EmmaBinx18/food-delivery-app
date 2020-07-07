SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find a user given the user id - returns JSON string
-- 
-- Usage:   
/*
	DECLARE @Error int 
	EXEC p_Get_User '{ "userId" : "slxNSWygiaRMKB51u63ld4fQqh73" }', @Error OUTPUT 
	--OR EXEC p_Get_User '{ "userId" : "admin_uid" }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Users]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_User')
	DROP PROCEDURE [dbo].[p_Get_User]
GO

CREATE PROCEDURE p_Get_User 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @userId VARCHAR(128)
	SELECT @userId = userId
	FROM OPENJSON(@JSON) 
	WITH (userId VARCHAR(128) )

	IF (@userId IS NULL)
		BEGIN
			SELECT U.*, ISNULL(UR.RoleId,0) [roleid]
			FROM [Users] U
			LEFT OUTER JOIN [UserRole] UR ON UR.UserId = U.userId 
			FOR JSON PATH	 
			
			
		END
	ELSE
		BEGIN
			SELECT U.*, ISNULL(UR.RoleId,0) [roleid]
			FROM [Users] U
			LEFT OUTER JOIN [UserRole] UR ON UR.UserId = U.userId 
			WHERE U.userId = @userId
			FOR JSON PATH	
		END
	SET @Error = 0
END
GO

