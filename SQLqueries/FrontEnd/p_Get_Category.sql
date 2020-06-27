SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find category if given id or all categories
-- 
-- Usage:   EXEC p_Get_Category NULL
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Category')
	DROP PROCEDURE [dbo].[p_Get_Category]
GO

CREATE PROCEDURE p_Get_Category
	@id VARCHAR(128) NULL
AS
BEGIN
	SET NOCOUNT ON;

	IF (@id IS NULL)
		BEGIN
			SELECT *
			FROM [Category] 
			FOR JSON PATH	 
		END
	ELSE
		BEGIN
			SELECT *
			FROM [Category] 
			WHERE id = @id
			FOR JSON PATH	
		END

END
GO

