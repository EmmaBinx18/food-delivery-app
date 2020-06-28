SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find category if given id or all categories
-- 
-- Usage:  
/*
	DECLARE @Error int 
	EXEC p_Get_Category '{ "categoryId" : null }', @Error OUTPUT 
	--OR EXEC p_Get_Category '{ "categoryId" : 1 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Category]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Category')
	DROP PROCEDURE [dbo].[p_Get_Category]
GO

CREATE PROCEDURE p_Get_Category
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @categoryId VARCHAR(128)
	SELECT @categoryId = categoryId
	FROM OPENJSON(@JSON) 
	WITH (categoryId VARCHAR(128) )

	IF (@categoryId IS NULL)
		BEGIN
			SELECT *
			FROM [Category] 
			FOR JSON PATH	 
		END
	ELSE
		BEGIN
			SELECT *
			FROM [Category] 
			WHERE categoryId = @categoryId
			FOR JSON PATH	
		END

	SET @Error = 0
END
GO