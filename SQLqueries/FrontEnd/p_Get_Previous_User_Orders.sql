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
	EXEC p_Get_Previous_User_Orders '{ "userId" : 1 }', @Error OUTPUT 
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [User]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Previous_User_Orders')
	DROP PROCEDURE [dbo].p_Get_Previous_User_Orders
GO

CREATE PROCEDURE p_Get_Previous_User_Orders 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @businessId INT
	SELECT @businessId = businessId
	FROM OPENJSON(@JSON) 
	WITH (businessId INT)

	SELECT TOP 10 O.OrderId, P.ProductId, P.[Name] , OP.[OrderItemStarted], OP.[OrderItemReady], [Quantity], OP.[OrderItemReady] - OP.[OrderItemStarted] [actualPrepareTime], [Quantity]*[estimatedPrepareTime] [estimatedPrepareTime]
	FROM [Product] P
	INNER JOIN [Business] B ON B.BusinessId = P.BusinessId AND B.BusinessId = @businessId
	INNER JOIN [OrderProduct] OP ON OP.ProductId = P.ProductId
	INNER JOIN [Order] O ON O.OrderId = OP.OrderId
	WHERE OrderItemStarted IS NOT NULL OR OrderItemReady IS NOT NULL
END
GO

