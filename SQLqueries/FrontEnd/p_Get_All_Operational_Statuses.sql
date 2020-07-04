SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find available business operational statuses - returns JSON string
-- 
-- Usage:   EXEC p_Get_Business 1
/*
	DECLARE @Error int 
	EXEC p_Get_Operational_Status '{ "operationalStatusId" : null }', @Error OUTPUT
	--OR  EXEC p_Get_Operational_Status '{ "operationalStatusId" : 1 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Business]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Operational_Status')
	DROP PROCEDURE [dbo].p_Get_Operational_Status
GO

CREATE PROCEDURE p_Get_Operational_Status 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN

	DECLARE @operationalStatusId INT
	SELECT @operationalStatusId = operationalStatusId
	FROM OPENJSON(@JSON) 

	WITH (operationalStatusId INT )
	SET NOCOUNT ON;
	IF( @operationalStatusId IS NULL)
		BEGIN
			SELECT *
			FROM [OperationalStatus]
			FOR JSON PATH	 
		END
	ELSE
		BEGIN 
			SELECT *
			FROM [OperationalStatus]
			WHERE operationalStatusId = @operationalStatusId
			FOR JSON PATH	 
		END

	SET @Error = 0
END
GO
