SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-07-07
-- Description:	Finds an order given the order id - returns JSON string
-- 
-- Usage:   
/*
	DECLARE @Error int 
	EXEC p_Get_Order '{ "orderId" : 1 }', @Error OUTPUT 
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error

	select * from users
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Order')
	DROP PROCEDURE [dbo].[p_Get_Order]
GO

CREATE PROCEDURE p_Get_Order 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @orderId INT
	SELECT @orderId = orderId
	FROM OPENJSON(@JSON) 
	WITH (orderId INT)

	;WITH selected_order AS
	(
		SELECT * FROM [Order] O where orderId = @orderId
	),
	order_products AS
	(
		SELECT ao.orderId, P.[Name], op.quantity, B.[name] [business]--,  
		FROM selected_order ao
		INNER JOIN OrderProduct OP ON OP.orderId = ao.orderId
		INNER JOIN Product P ON P.ProductId = OP.productId
		INNER JOIN Business B ON B.businessId = P.businessId
	)
	SELECT ao.orderId, ao.orderDateTime, a.[address],  oa.[products], OS.[name] [orderStatus], U.firstName [driverName], d.[startTime] [deliveryStartTime], d.[endTime] [deliveryEndTime], DS.[name] [deliveryStatus]
	FROM selected_order ao
	INNER JOIN [Address] A ON ao.addressId = a.addressId 
	INNER JOIN [OrderStatus] OS ON OS.orderStatusId = ao.orderStatusId
	INNER JOIN 
	(
	
			SELECT
				OrderId,
				JSON_QUERY(Products,'$') AS [products]
			FROM
				selected_order h
				CROSS APPLY
				(
				SELECT 
					(
					SELECT  
						c.[name], c.quantity, c.[business]
					FROM
						order_products c
					WHERE
						c.orderId = h.orderId
						FOR JSON PATH
					) AS Products
				) d	
	) oa ON ao.orderId = oa.orderId
	LEFT OUTER JOIN Delivery D ON D.deliveryId = ao.deliveryId
	LEFT OUTER JOIN DeliveryStatus DS ON DS.DeliveryStatusId = D.DeliveryStatusId
	LEFT OUTER JOIN [Users] U ON U.userId = D.[driverId]
	ORDER BY orderDateTime, ao.orderid
	FOR JSON PATH

END
GO

	
