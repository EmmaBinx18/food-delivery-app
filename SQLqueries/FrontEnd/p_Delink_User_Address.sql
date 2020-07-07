SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Removes the given the user id and address id from the user address table
-- 
-- Usage: 
 /*
    DECLARE @Error int 
	EXEC p_Delink_User_Address '{ "userId" : "user_uid", "addressId" : 1 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [UserAddress]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Delink_User_Address')
	DROP PROCEDURE [dbo].[p_Delink_User_Address]
GO

CREATE PROCEDURE p_Delink_User_Address 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT

AS
BEGIN
	BEGIN TRY
		SET NOCOUNT ON;

		DECLARE	@userId VARCHAR(128), @addressId INT
		SELECT @userId = userId, @addressId = addressId
		FROM OPENJSON(@JSON)
		WITH (userId VARCHAR(128) , addressId INT)

		DELETE FROM [UserAddress] WHERE userId = @userId AND addressId = @addressId			

		SET @Error = 0
		SELECT 1 [success] , NULL [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END TRY
	BEGIN CATCH
		EXEC p_Insert_Error @Error OUTPUT
		SELECT 0 [success] , @Error [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
	END CATCH
END
GO