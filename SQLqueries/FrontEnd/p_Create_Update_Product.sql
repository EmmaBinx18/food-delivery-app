
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-23
-- Description:	Create a product for a business, 
--				*NOTE: A product's business ID cannot be updated, availabilitystatus id defaults on insert
-- Usage : 
 /*
    DECLARE @Error int 
	EXEC p_Create_Update_Product '{  "productId": -1,  "name": "product name",  "description": "product description",  "businessId": 1,  "availabilityStatusId": 1,  "price": 25,  "minPrepareTime": 15}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Product]
*/
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Create_Update_Product')
	DROP PROCEDURE [dbo].[p_Create_Update_Product]
GO

CREATE PROCEDURE p_Create_Update_Product 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		DECLARE @productId INT,
				@name VARCHAR(55),
				@description VARCHAR(MAX),
				@businessId INT,
				@availabilityStatusId INT,
				@price DECIMAL(9,2),
				@minPrepareTime INT

		
		SELECT @productId = productId, @name=[name], @description = [description], @businessId = businessId,  @availabilityStatusId=availabilityStatusId, @price = price, @minPrepareTime = minPrepareTime 
		FROM OPENJSON(@JSON)
		WITH (productId INT, [name] VARCHAR(55),[description] VARCHAR(MAX), businessId INT, availabilityStatusId INT, price DECIMAL(9,2), minPrepareTime INT)
			
		IF EXISTS (SELECT productId FROM [Product] WHERE productId = @productId)
			BEGIN
				UPDATE [Product]
				SET	[name]= @name, 
					[description] = @description,
					--[businessId= @businessId],
					[availabilityStatusId] = @availabilityStatusId,
					[price] = @price,
					[minPrepareTime] = @minPrepareTime
				WHERE productId = @productId
			END
		ELSE
			BEGIN		
				SET @availabilityStatusId = (SELECT availabilityStatusId FROM [AvailabilityStatus] WHERE [Name] LIKE 'Available')

				INSERT INTO [Product]
				VALUES (@name,	@description, @businessId, @availabilityStatusId, @price, @minPrepareTime)
				SET @productId = SCOPE_IDENTITY()
			END
			
		SET @Error = 0 
	END TRY
	BEGIN CATCH
		EXEC p_Insert_Error @Error OUTPUT
	END CATCH

END
GO



