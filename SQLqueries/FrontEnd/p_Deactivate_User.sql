SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Deactivate a user given the user id
-- 
-- Usage:   EXEC p_Deactivate_User '123' 
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Deactivate_User')
	DROP PROCEDURE [dbo].[p_Deactivate_User]
GO

CREATE PROCEDURE p_Deactivate_User 
	@id VARCHAR(128)
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE [User]
	SET [isActive] = 0
	WHERE id = @id			
END
GO