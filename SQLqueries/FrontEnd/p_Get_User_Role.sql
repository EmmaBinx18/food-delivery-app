SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find a users with the given the role - returns JSON string
-- 
-- Usage:   
/*
	DECLARE @Error int 
	EXEC p_Get_User_Role '{ "roleId" : 2 }', @Error OUTPUT 
	--OR EXEC p_Get_User_Role '{ "roleId" : "admin_uid" }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [UserRole]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_User_Role')
	DROP PROCEDURE [dbo].[p_Get_User_Role]
GO

CREATE PROCEDURE p_Get_User_Role 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @roleId INT
	SELECT @roleId = roleId
	FROM OPENJSON(@JSON) 
	WITH (roleId INT)

	SELECT UR.UserId
	FROM [UserRole] UR 
	WHERE roleId = @roleId
	FOR JSON PATH	 
			
	SET @Error = 0
END
GO

