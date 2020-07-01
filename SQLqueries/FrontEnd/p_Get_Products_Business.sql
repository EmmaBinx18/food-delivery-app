SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find products provided by a business - returns JSON string
-- 
-- Usage:   
/*
	DECLARE @Error int 
	EXEC p_Get_Products_Business '{ "businessId" : null }', @Error OUTPUT
	--EXEC p_Get_Products_Business '{ "businessId" : 2 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Product]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Products_Business')
	DROP PROCEDURE [dbo].[p_Get_Products_Business]
GO

CREATE PROCEDURE p_Get_Products_Business
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT 
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @businessId INT
	SELECT @businessId = businessId
	FROM OPENJSON(@JSON) 
	WITH (businessId INT )

	IF( @businessId IS NULL)
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
			WHERE P.businessId = @businessId
			FOR JSON PATH	 
		END

	SET @Error = 0
END
GO
