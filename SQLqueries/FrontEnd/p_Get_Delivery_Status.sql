SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-07-07
-- Description:	Find available product Delivery statuses - returns JSON string
-- 
-- Usage:   EXEC p_Get_Business 1
/*
	DECLARE @Error int 
	EXEC p_Get_Delivery_Status '{ "deliveryStatusId" : null }', @Error OUTPUT
	--OR  EXEC p_Get_Delivery_Status '{ "deliveryStatusId" : 1 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Business]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Delivery_Status')
	DROP PROCEDURE [dbo].p_Get_Delivery_Status
GO

CREATE PROCEDURE p_Get_Delivery_Status 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN

	DECLARE @deliveryStatusId INT
	SELECT @deliveryStatusId = deliveryStatusId
	FROM OPENJSON(@JSON) 
	WITH (deliveryStatusId INT )

	SET NOCOUNT ON;
	IF( @DeliveryStatusId IS NULL)
		BEGIN
			SELECT *
			FROM [DeliveryStatus]
			FOR JSON PATH	 
		END
	ELSE
		BEGIN 
			SELECT *
			FROM [DeliveryStatus]
			WHERE deliveryStatusId = @deliveryStatusId
			FOR JSON PATH	 
		END

	SET @Error = 0
END
GO
