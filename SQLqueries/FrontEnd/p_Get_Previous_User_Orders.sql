SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-07-07
-- Description:	Finds a user's previous orders given the user id - returns JSON string
-- 
-- Usage:   
/*
	DECLARE @Error int 
	EXEC p_Get_Previous_User_Orders '{ "userId" : "PiAfL1byyDf6UypJYUmCC9iLP712" }', @Error OUTPUT 
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error

	select * from users
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Previous_User_Orders')
	DROP PROCEDURE [dbo].[p_Get_Previous_User_Orders]
GO

CREATE PROCEDURE p_Get_Previous_User_Orders 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @userId VARCHAR(128)
	SELECT @userId = userId
	FROM OPENJSON(@JSON) 
	WITH (userId VARCHAR(128))

	DECLARE @count INT

	IF EXISTS(SELECT * FROM [Order] O WHERE customerId = @userId)
	BEGIN
		;WITH available_orders AS
		(
			SELECT * FROM [Order] O WHERE customerId = @userId
		),
		order_products AS
		(
				SELECT ao.orderId, P.[Name], op.quantity, B.[name] [business]--,  
				FROM available_orders ao
				INNER JOIN OrderProduct OP ON OP.orderId = ao.orderId
				INNER JOIN Product P ON P.ProductId = OP.productId
				INNER JOIN Business B ON B.businessId = P.businessId
		)
		SELECT ao.orderId, ao.orderDateTime, a.[address],  oa.[products], OS.[name] [orderStatus], U.firstName [driverName], d.[startTime] [deliveryStartTime], d.[endTime] [deliveryEndTime]
		FROM available_orders ao
		INNER JOIN [Address] A ON ao.addressId = a.addressId 
		INNER JOIN [OrderStatus] OS ON OS.orderStatusId = ao.orderStatusId
		INNER JOIN 
		(
	
				SELECT
					OrderId,
					JSON_QUERY(Products,'$') AS [products]
				FROM
					available_orders h
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
		LEFT OUTER JOIN [Users] U ON U.userId = D.[driverId]
		ORDER BY orderDateTime, ao.orderid
		FOR JSON PATH
	END
	ELSE
	BEGIN
		SELECT 0 [results]
		FOR JSON PATH--, INCLUDE_NULL_VALUES 
	END

END
GO

	
