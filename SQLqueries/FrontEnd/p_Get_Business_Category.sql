SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find the category of a given the business id - returns JSON string
-- 
-- Usage:   
/*
	DECLARE @Error int 
	EXEC p_Get_Business_Category '{ "categoryid" : 1 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Business]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Business_Category')
	DROP PROCEDURE [dbo].[p_Get_Business_Category]
GO

CREATE PROCEDURE p_Get_Business_Category 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT 
AS
BEGIN

	DECLARE @categoryid VARCHAR(128)
	SELECT @categoryid = categoryid
	FROM OPENJSON(@JSON) 
	WITH (categoryid INT )

	SET NOCOUNT ON;
	SELECT *
	FROM [Business]
	WHERE categoryId = @categoryid
	FOR JSON PATH	 

	SET @Error = 0
END
GO
