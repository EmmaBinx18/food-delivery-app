SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-27
-- Description:	Start with Order Product ; Expects productId, orderId; Returns affected rowcount 
-- 
-- Usage: 
 /*
    DECLARE @Error int 
	EXEC p_Start_With_Order_Product '{ "productId" : 1, "orderId" : 1}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [OrderProduct]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Start_With_Order_Product')
	DROP PROCEDURE [dbo].p_Start_With_Order_Product
GO

CREATE PROCEDURE p_Start_With_Order_Product 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT

AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @OrderProductStatusP INT, @BusinessId INT, @productId INT, @orderId INT
	SELECT @OrderProductStatusP = OrderProductStatusId FROM OrderProductStatus WHERE [Name] LIKE 'In_progress'

	SELECT @productId = productId, @orderId = orderId
	FROM OPENJSON(@JSON)
	WITH (productId INT, orderId INT)

	UPDATE [OrderProduct]
		SET OrderProductStatusId = @OrderProductStatusP,
			[orderItemStarted] = GETDATE()
	WHERE productId = @productId AND  orderId = @orderId 

	SELECT @@ROWCOUNT

	SET @Error = 0
END
GO