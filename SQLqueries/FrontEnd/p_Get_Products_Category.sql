SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find products in a category - returns JSON string
-- 
-- Usage:   
/*
	DECLARE @Error int 
	--EXEC p_Get_Products_Category '{ "categoryid" : null }', @Error OUTPUT
	EXEC p_Get_Products_Category '{ "categoryid" : 2 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Product]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Products_Category')
	DROP PROCEDURE [dbo].[p_Get_Products_Category]
GO

CREATE PROCEDURE p_Get_Products_Category 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT 
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @categoryid INT
	SELECT @categoryid = categoryid
	FROM OPENJSON(@JSON) 
	WITH (categoryid INT )

	IF( @categoryId IS NULL)
		BEGIN 
			SELECT P.*
			FROM [Product] P 
			INNER JOIN [Business] B ON B.businessId = P.businessId
			FOR JSON PATH	 

		END
	ELSE
		BEGIN
			SELECT P.*
			FROM [Product] P 
			INNER JOIN [Business] B ON B.businessId = P.businessId AND categoryId = @categoryid
			FOR JSON PATH	 
		END

	--SET @Error = 0
END
GO
