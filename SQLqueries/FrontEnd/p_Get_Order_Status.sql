SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-07-08
-- Description:	Find available order statuses - returns JSON string
-- 
-- Usage:   
/*
	DECLARE @Error int 
	EXEC p_Get_Order_Status '{ "orderStatusId" : null }', @Error OUTPUT
	--OR  EXEC p_Get_Order_Status '{ "orderStatusId" : 1 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Tracking]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Order_Status')
	DROP PROCEDURE [dbo].p_Get_Order_Status
GO

CREATE PROCEDURE p_Get_Order_Status 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @orderStatusId INT
	SELECT @orderStatusId = orderStatusId
	FROM OPENJSON(@JSON) 

	WITH (orderStatusId INT )
	
	IF( @orderStatusId IS NULL)
		BEGIN
			SELECT *
			FROM [OrderStatus]
			FOR JSON PATH	 
		END
	ELSE
		BEGIN 
			SELECT *
			FROM [OrderStatus]
			WHERE orderStatusId = @orderStatusId
			FOR JSON PATH	 
		END

	SET @Error = 0
END
GO
