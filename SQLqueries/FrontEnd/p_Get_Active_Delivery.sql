SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find active delivery in order for a given driver id - returns JSON string
-- 
-- Usage:   
/*
	DECLARE @Error int 
	EXEC p_Get_Active_Delivery '{ "driverId" : "driver_uid" }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Active_Delivery')
	DROP PROCEDURE [dbo].[p_Get_Active_Delivery]
GO

CREATE PROCEDURE p_Get_Active_Delivery 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT 
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @OrderStatusDId INT
	SET @OrderStatusDId = 4 --'Delivery_In_Progess'

	DECLARE @driverId VARCHAR(128)

	SELECT @driverId = driverId
	FROM OPENJSON(@JSON) 
	WITH (driverId VARCHAR(128) );

	WITH delivey_orders AS
	(
		SELECT * FROM [Order] WHERE OrderStatusId = @OrderStatusDId
	)
	SELECT do.deliveryId, do.orderId, do.orderDateTime
	FROM delivey_orders do 
	INNER JOIN [Delivery] D ON D.deliveryId = do.deliveryId AND D.driverId = @driverId
	FOR JSON PATH


	SET @Error = 0
END
GO
