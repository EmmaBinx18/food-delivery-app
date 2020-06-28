SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find a user given the business id - returns JSON string
-- 
-- Usage:   EXEC p_Get_Business 1
/*
	DECLARE @Error int 
	EXEC p_Get_Business '{ "businessId" : null }', @Error OUTPUT
	--OR  EXEC p_Get_Business '{ "businessId" : 1 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Business]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Business')
	DROP PROCEDURE [dbo].[p_Get_Business]
GO

CREATE PROCEDURE p_Get_Business 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN

	DECLARE @businessId VARCHAR(128)
	SELECT @businessId = businessId
	FROM OPENJSON(@JSON) 

	WITH (businessId VARCHAR(128) )
	SET NOCOUNT ON;
	IF( @businessId IS NULL)
		BEGIN
			SELECT *
			FROM [Business]
			FOR JSON PATH	 
		END
	ELSE
		BEGIN 
			SELECT *
			FROM [Business]
			WHERE businessId = @businessId
			FOR JSON PATH	 
		END

	SET @Error = 0
END
GO
