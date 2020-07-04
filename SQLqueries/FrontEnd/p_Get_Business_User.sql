SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find a user given the business id - returns JSON string
-- 
-- Usage:   
/*
	DECLARE @Error int 
	EXEC p_Get_Business_User '{ "userId" : "chef_uid" }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [User]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Business_User')
	DROP PROCEDURE [dbo].p_Get_Business_User
GO

CREATE PROCEDURE p_Get_Business_User 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT 
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @userId VARCHAR(128)
	SELECT @userId = userId
	FROM OPENJSON(@JSON) 
	WITH (userId VARCHAR(128) )

	
	SELECT B.*
	FROM [Business] B
	INNER JOIN [BusinessUser] BU ON BU.BusinessId = B.BusinessId AND BU.UserId = @userId
	FOR JSON PATH	 

	SET @Error = 0
END
GO
