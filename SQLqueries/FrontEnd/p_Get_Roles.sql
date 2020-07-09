SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-07-09
-- Description:	Find available roles - returns JSON string
-- 
-- Usage:   
/*
	DECLARE @Error int 
	EXEC p_Get_Roles '{ "roleId" : null }', @Error OUTPUT
	--OR  EXEC p_Get_Roles '{ "roleId" : 1 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Business]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Roles')
	DROP PROCEDURE [dbo].p_Get_Roles
GO

CREATE PROCEDURE p_Get_Roles 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN

	DECLARE @roleId INT
	SELECT @roleId = roleId
	FROM OPENJSON(@JSON) 

	WITH (roleId INT )
	SET NOCOUNT ON;
	IF( @roleId IS NULL)
		BEGIN
			SELECT *
			FROM [Role]
			FOR JSON PATH	 
		END
	ELSE
		BEGIN 
			SELECT *
			FROM [Role]
			WHERE roleId = @roleId
			FOR JSON PATH	 
		END

	SET @Error = 0
END
GO
