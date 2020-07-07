SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-07-07
-- Description:	Find available product availability statuses - returns JSON string
-- 
-- Usage:   EXEC p_Get_Business 1
/*
	DECLARE @Error int 
	EXEC p_Get_Availability_Status '{ "availabilityStatusId" : null }', @Error OUTPUT
	--OR  EXEC p_Get_Availability_Status '{ "availabilityStatusId" : 1 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Business]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Availability_Status')
	DROP PROCEDURE [dbo].p_Get_Availability_Status
GO

CREATE PROCEDURE p_Get_Availability_Status 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN

	DECLARE @availabilityStatusId INT
	SELECT @availabilityStatusId = availabilityStatusId
	FROM OPENJSON(@JSON) 
	WITH (availabilityStatusId INT )

	SET NOCOUNT ON;
	IF( @availabilityStatusId IS NULL)
		BEGIN
			SELECT *
			FROM [AvailabilityStatus]
			FOR JSON PATH	 
		END
	ELSE
		BEGIN 
			SELECT *
			FROM [AvailabilityStatus]
			WHERE availabilityStatusId = @availabilityStatusId
			FOR JSON PATH	 
		END

	SET @Error = 0
END
GO
