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

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Business_Category')
	DROP PROCEDURE [dbo].[p_Get_Business_Category]
GO

CREATE PROCEDURE p_Get_Business_Category 
	@categoryid int 
AS
BEGIN
	SET NOCOUNT ON;
	SELECT *
	FROM [Business]
	WHERE categoryId = @categoryid
	FOR JSON PATH	 
END
GO
