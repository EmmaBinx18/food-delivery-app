
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-07-07
-- Description:	Updates operational status id for given business id
-- Usage : 
 /*
    DECLARE @Error int 
	EXEC p_Close_Business '{  "businessId": 1,  "activate": 1}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [business]
*/
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Close_Business')
	DROP PROCEDURE [dbo].p_Close_Business
GO

CREATE PROCEDURE p_Close_Business
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		DECLARE @businessId INT,
				@activate BIT,
				@operationalStatusId INT = 3
		
		SELECT @businessId = businessId, @activate = activate
		FROM OPENJSON(@JSON)
		WITH (businessId INT, activate BIT)

		IF (@activate IS NOT NULL)
		BEGIN
			SET @operationalStatusId = 2
		END

		UPDATE [Business]
		SET	[operationalStatusId] = @operationalStatusId
		WHERE businessId = @businessId
			
		SET @Error = 0 
		SELECT @businessId [businessId] , 1 [success] , NULL [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END TRY
	BEGIN CATCH
		EXEC p_Insert_Error @Error OUTPUT
		SELECT @businessId [businessId] , 0 [success] , @Error [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END CATCH

END
GO



