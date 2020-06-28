
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Close a business given the business id
-- 
-- Usage: 
 /*
    DECLARE @Error int 
	EXEC p_Close_Business '{ "businessId" : 2}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Business]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Close_Business')
	DROP PROCEDURE [dbo].[p_Close_Business]
GO

CREATE PROCEDURE p_Close_Business 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT

AS
BEGIN

	SET NOCOUNT ON;

	DECLARE	@businessId INT, @OperationalStatusCid INT

	SELECT @businessId = businessId
	FROM OPENJSON(@JSON)
	WITH (businessId INT)

	SELECT @OperationalStatusCid = OperationalStatusId  FROM OperationalStatus WHERE [Name] LIKE 'Closed'

	UPDATE [Business]
		SET OperationalStatusId = @OperationalStatusCid
	WHERE businessId = @businessId			

	SET @Error = 0
END
GO