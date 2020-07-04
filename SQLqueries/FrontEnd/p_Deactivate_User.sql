SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Deactivate a user given the user id
-- 
-- Usage: 
 /*
    DECLARE @Error int 
	EXEC p_Deactivate_User '{ "userId" : "uniqueidentifier"}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [User]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Deactivate_User')
	DROP PROCEDURE [dbo].[p_Deactivate_User]
GO

CREATE PROCEDURE p_Deactivate_User 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT

AS
BEGIN
	BEGIN TRY
		DECLARE	@userId VARCHAR(128)
		SELECT @userId = userId
		FROM OPENJSON(@JSON)
		WITH (userId VARCHAR(128) )

		SET NOCOUNT ON;
		UPDATE [User]
		SET [isActive] = 0
		WHERE userId = @userId			

		SET @Error = 0
		SELECT 1 [success] , NULL [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END TRY
	BEGIN CATCH
		EXEC p_Insert_Error @Error OUTPUT
		SELECT 0 [success] , @Error [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END CATCH
END
GO