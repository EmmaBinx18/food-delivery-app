SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-27
-- Description:	Approve a business given the business id and activate 1 or all pending approval businesses when given id NULL, deny when id and no activate
-- 
-- Usage: 
 /*
    DECLARE @Error int 
	EXEC p_Approve_Business '{ "businessId" : 1}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Business]
	select * from [OperationalStatus]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Approve_Business')
	DROP PROCEDURE [dbo].[p_Approve_Business]
GO

CREATE PROCEDURE p_Approve_Business 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT

AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		DECLARE @operationalStatusOId  INT,  @operationalStatusPId  INT, @operationalStatusDId INT, @activate BIT
		SET @operationalStatusOId = 2 --open
		SET @operationalStatusPId = 1 --pending approval
		SET @operationalStatusDId = 4 --denied

		DECLARE	@businessId INT
		SELECT @businessId = businessId, @activate = activate
		FROM OPENJSON(@JSON)
		WITH (businessId INT, activate BIT)

		IF (@BusinessId IS NULL)
			BEGIN
				UPDATE [Business]
					SET operationalStatusId = @operationalStatusOId
				WHERE operationalStatusId = @operationalStatusPId
			END
		ELSE
			BEGIN		
				UPDATE [Business]
					SET operationalStatusId = CASE WHEN @activate IS NULL THEN @operationalStatusDId ELSE  @operationalStatusOId END
				WHERE businessId = @businessId			
			END
		SET @Error = 0
		SELECT 1 [success] , NULL [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END TRY
	BEGIN CATCH
		EXEC p_Insert_Error @Error OUTPUT
		SELECT  0 [success] , @Error [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END CATCH
END
GO