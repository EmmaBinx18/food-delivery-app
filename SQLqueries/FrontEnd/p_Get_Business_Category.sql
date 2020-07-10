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
	EXEC p_Get_Business_Category '{ "categoryId" : 4 }', @Error OUTPUT
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
	SET NOCOUNT ON;

	DECLARE @categoryid VARCHAR(128)
	SELECT @categoryid = categoryid
	FROM OPENJSON(@JSON) 
	WITH (categoryId INT )

	;WITH businesses_with_products AS
	(
		SELECT DISTINCT businessId 
		FROM Product P
		WHERE P.availabilitystatusId IN (1,3)
	)
	SELECT B.*
	FROM businesses_with_products bp 
	INNER JOIN [Business] B ON bp.businessId = B.businessId
	WHERE categoryId = @categoryid
	FOR JSON PATH	 

	SET @Error = 0
END
GO
