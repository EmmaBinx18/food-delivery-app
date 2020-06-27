SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find a user given the user id - returns JSON string
-- 
-- Usage:   EXEC p_Get_User 'uniqueidentifier' 
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_User')
	DROP PROCEDURE [dbo].[p_Get_User]
GO

CREATE PROCEDURE p_Get_User 
	@id VARCHAR(128)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT *
	FROM [User]
	WHERE id = @id
	FOR JSON PATH	 
END
GO