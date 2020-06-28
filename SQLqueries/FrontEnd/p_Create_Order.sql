
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-23
-- Description:	Create an order with list of products
-- Usage:
/*
	SAMPLE JSON:
	============
	'{ 
	"customerId" : "user_uid",
	"addressId": 1,
	"orderDateTime" : '2004-06-27T18:00:00',
	"products" :
			[
				 {"productId":1,"quantity":1},
				 {"productId":2,"quantity":4}
			]
	}'	

	
	DECLARE @Error int 
	EXEC p_Create_Order '{ "customerId" : "user_uid","addressId": 1,"orderDateTime" : "2004-06-27T18:00:00",	"products" :[ {"productId":1,"quantity":1}, {"productId":2,"quantity":4}]}'	, @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Order]
	SELECT * FROM [OrderProduct]
*/
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Create_Order')
	DROP PROCEDURE [dbo].[p_Create_Order]
GO

CREATE PROCEDURE p_Create_Order 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	
	BEGIN TRANSACTION
		BEGIN TRY
			DECLARE	@orderId INT,
					@customerId VARCHAR(128),
					@addressId INT,
					@orderDateTime DATETIME,
					@orderPlacedDateTime DATETIME = GETDATE(),
					@orderStatusId INT ,
					@orderProductStatusId INT 
			

			SELECT TOP 1 @orderStatusId = orderStatusId FROM OrderStatus WHERE [name] LIKE 'Awaiting_Payment'

			SELECT TOP 1  @orderProductStatusId = orderProductStatusId FROM [OrderProductStatus] WHERE [name] LIKE 'Pending_Acceptance'
						
			INSERT INTO [Order] (customerId, addressId, orderDateTime, orderPlacedDateTime, orderStatusId)
			SELECT customerId, addressId, orderDateTime, @orderPlacedDateTime, @orderStatusId
			FROM OPENJSON (@JSON)
			WITH (customerId VARCHAR(128), addressId INT, orderDateTime DATETIME)

			SET @orderId = SCOPE_IDENTITY()

			DECLARE @Temp TABLE
			(
				productId int,
				quantity int,
				availabilityStatusId int,
				price decimal(9,2),
				minPrepareTime int
			);

			WITH ordered_products AS
			(
				SELECT productId, quantity
				FROM OPENJSON( @json, '$.products' ) 
				WITH (productId INT '$.productId', quantity INT '$.quantity')
			)
			INSERT INTO @Temp 
			SELECT op.productId, op.quantity, P.availabilityStatusId,  P.price, P.minPrepareTime
			FROM ordered_products op 
			LEFT OUTER JOIN Product P ON P.productId = op.ProductId
	
			DECLARE @availabilityStatusNAId INT 
			SELECT @availabilityStatusNAId = availabilityStatusId FROM AvailabilityStatus WHERE [name] LIKE 'Not_Available'

			DECLARE @availabilityStatusOSId INT 
			SELECT @availabilityStatusOSId = availabilityStatusId FROM AvailabilityStatus WHERE [name] LIKE 'Out_Of_Stock'

			IF EXISTS (SELECT productId FROM @Temp WHERE availabilityStatusId = @availabilityStatusNAId OR availabilityStatusId = @availabilityStatusOSId)
				BEGIN
					THROW 50005, N'One or more products are no longer available', 1;
				END
			ELSE
				BEGIN
					INSERT INTO OrderProduct (productId, quantity, orderId, orderProductStatusId, productPrice, estimatedPrepareTime)
					SELECT productId,quantity, @orderId,@orderProductStatusId,	price,minPrepareTime
					FROM @Temp
				END
			
			COMMIT
			SET @Error = 0
		END TRY
		BEGIN CATCH
			ROLLBACK
			EXEC p_Insert_Error @Error OUTPUT
		END CATCH
END
GO

