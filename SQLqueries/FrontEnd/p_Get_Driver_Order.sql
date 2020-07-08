SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-07-07
-- Description:	Finds order(s) given the driver id (and or delivery status id) - returns JSON string
--			
-- Usage:   
/*
	DECLARE @Error int 
	EXEC p_Get_Driver_Order '{ "driverId" : "driver_uid" , "deliveryStatusId" : 1}', @Error OUTPUT 
	-- OR EXEC p_Get_Driver_Order '{ "driverId" : "driver_uid" , "deliveryStatusId" : 1}', @Error OUTPUT 
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error

	select * from users
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Driver_Order')
	DROP PROCEDURE [dbo].[p_Get_Driver_Order]
GO

CREATE PROCEDURE p_Get_Driver_Order 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @driverId VARCHAR(128), @deliveryStatusId INT = NULL
	SELECT @driverId = driverId, @deliveryStatusId = deliveryStatusId
	FROM OPENJSON(@JSON) 
	WITH (driverId VARCHAR(128), deliveryStatusId INT)

	
	IF EXISTS(SELECT * FROM [Delivery] WHERE driverId = @driverId)
	BEGIN
		IF (@deliveryStatusId IS NOT NULL)
		BEGIN
			SELECT O.orderId, OS.[name] [orderStatus], o.OrderDateTime, D.startTime, d.endTime, d.kmTraveled, d.etd, ds.[name] [deliveryStatus]
			FROM Delivery D 
			INNER JOIN [Order] O ON D.deliveryId = O.deliveryId AND D.driverId = @driverId
			INNER JOIN [Address] A ON O.addressId = A.addressId
			INNER JOIN [OrderStatus] OS ON OS.orderStatusId = O.orderStatusId
			INNER JOIN DeliveryStatus DS ON DS.DeliveryStatusId = D.DeliveryStatusId AND D.DeliveryStatusId = @deliveryStatusId
			ORDER BY o.orderDateTime, o.orderid
			FOR JSON PATH
		END
		ELSE
		BEGIN
			SELECT O.orderId, OS.[name] [orderStatus], o.OrderDateTime, D.startTime, d.endTime, d.kmTraveled, d.etd, ds.[name] [deliveryStatus]
			FROM Delivery D 
			INNER JOIN [Order] O ON D.deliveryId = O.deliveryId AND D.driverId = @driverId
			INNER JOIN [Address] A ON O.addressId = A.addressId
			INNER JOIN [OrderStatus] OS ON OS.orderStatusId = O.orderStatusId
			INNER JOIN DeliveryStatus DS ON DS.DeliveryStatusId = D.DeliveryStatusId 
			ORDER BY o.orderDateTime, o.orderid
			FOR JSON PATH
		END
	END
	--ELSE
	--BEGIN
	--	SELECT 1 [undefined]
	--	FOR JSON PATH, INCLUDE_NULL_VALUES 
	--END
END
GO

	
