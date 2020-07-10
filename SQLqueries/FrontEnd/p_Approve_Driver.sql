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
	EXEC p_Approve_Driver '{ "driverId" : "0BnkSHPdt8NR1exhtO4vkynAoag1", "activate" : 1}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [userRole]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Approve_Driver')
	DROP PROCEDURE [dbo].[p_Approve_Driver]
GO

CREATE PROCEDURE p_Approve_Driver 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT

AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		DECLARE @activate BIT
		
		DECLARE	@driverId VARCHAR(128)
		SELECT @driverId = driverId, @activate = activate
		FROM OPENJSON(@JSON)
		WITH (driverId VARCHAR(128), activate BIT)

		UPDATE [UserRole]
			SET isApproved = CASE WHEN @activate IS NULL THEN 0 ELSE  1 END
		WHERE userId = @driverId			

		SET @Error = 0
		SELECT 1 [success] , NULL [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END TRY
	BEGIN CATCH
		EXEC p_Insert_Error @Error OUTPUT
		SELECT  0 [success] , @Error [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END CATCH
END
GO