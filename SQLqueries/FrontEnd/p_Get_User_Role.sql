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
	IF (@roleId IS NOT NULL)
	BEGIN
		SELECT U.*
		FROM [UserRole] UR 
		INNER JOIN [User] U ON U.userId = UR.userId
		WHERE roleId = @roleId
		FOR JSON PATH	 
	END
	ELSE
	BEGIN
		SELECT U.*
		FROM [User] U
		LEFT OUTER JOIN  [UserRole] UR ON U.userId = UR.userId
		WHERE UR.roleId IS NULL
	END
	SET @Error = 0
END
GO

