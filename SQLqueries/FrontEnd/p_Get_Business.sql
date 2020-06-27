SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find a user given the business id - returns JSON string
-- 
-- Usage:   EXEC p_Get_Business 1
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Business')
	DROP PROCEDURE [dbo].[p_Get_Business]
GO

CREATE PROCEDURE p_Get_Business 
	@id int = NULL
AS
BEGIN
	SET NOCOUNT ON;
	IF( @id IS NULL)
		BEGIN
			SELECT *
			FROM [Business]
			FOR JSON PATH	 
		END
	ELSE
		BEGIN 
			SELECT *
			FROM [Business]
			WHERE id = @id
			FOR JSON PATH	 
		END
END
GO
