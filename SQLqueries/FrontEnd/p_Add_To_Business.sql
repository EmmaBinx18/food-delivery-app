
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-23
-- Description:	Add User To Business
-- Usage: 
 /*
    DECLARE @Error int 
	EXEC p_Add_To_Business '{ "userId" : "user_uid", "businessId" : 1}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [BusinessUser]
*/
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Add_To_Business')
	DROP PROCEDURE [dbo].[p_Add_To_Business]
GO

CREATE PROCEDURE p_Add_To_Business 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		DECLARE @userId VARCHAR(128), @businessId INT
		SELECT @userId = userId, @businessId = businessId
		FROM OPENJSON(@JSON)
		WITH (userId VARCHAR(128), businessId INT )

		IF EXISTS (SELECT * FROM [BusinessUser] WHERE userId = @userId)
			BEGIN
				UPDATE [BusinessUser] 
				SET businessId = @businessId
				WHERE UserId = @userId
			END
		ELSE
			BEGIN
				INSERT INTO [BusinessUser]
				VALUES (@userId, @businessId)
			END
		SET @Error = 0
	END TRY
	BEGIN CATCH
		EXEC p_Insert_Error @Error OUTPUT
	END CATCH
END
GO
