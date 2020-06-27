SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find a user given the user id - returns JSON string
-- 
-- Usage:   EXEC p_Get_User 'admin_uid' 
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_User')
	DROP PROCEDURE [dbo].[p_Get_User]
GO

CREATE PROCEDURE p_Get_User 
	@id VARCHAR(128) NULL
AS
BEGIN
	SET NOCOUNT ON;

	IF (@id IS NULL)
		BEGIN
			SELECT U.*, ISNULL(UR.RoleId,0) [roleid]
			FROM [User] U
			LEFT OUTER JOIN [UserRole] UR ON UR.UserId = U.ID 
			FOR JSON PATH	 
		END
	ELSE
		BEGIN
			SELECT U.*, ISNULL(UR.RoleId,0) [roleid]
			FROM [User] U
			LEFT OUTER JOIN [UserRole] UR ON UR.UserId = U.ID 
			WHERE U.id = @id
			FOR JSON PATH	
		END

END
GO

