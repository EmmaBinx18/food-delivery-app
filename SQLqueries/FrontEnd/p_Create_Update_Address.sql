
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-23
-- Description:	Add Address
-- Usage : 
 /*
    DECLARE @Error int 
	EXEC p_Create_Update_Address '{ "addressId" : -1, "streetName" : "Street12", "suburb" : "Suburb1", "zipCode" : "1234", "streetNo" : 1,"complexName" : "Complex1", "houseNo"  : 1, "cityId" : 1 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Address]
*/
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Create_Update_Address')
	DROP PROCEDURE [dbo].p_Create_Update_Address
GO

CREATE PROCEDURE p_Create_Update_Address 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRANSACTION
		BEGIN TRY
			DECLARE @addressId INT,
					@streetName VARCHAR(255),
					@suburb VARCHAR(255),
					@zipCode VARCHAR(7),
					@streetNo INT,
					@complexName VARCHAR(255),
					@houseNo INT,
					@cityId INT

			SELECT @addressId = addressId, @streetName=streetName, @suburb = suburb, @zipCode = zipCode, @streetNo = streetNo, @complexName = complexName, @houseNo = houseNo, @cityId = cityId
			FROM OPENJSON(@JSON)
			WITH (addressId INT, streetName VARCHAR(255),suburb VARCHAR(255),zipCode VARCHAR(7),streetNo INT,complexName VARCHAR(255),houseNo INT,cityId INT)
			
			--SELECT @streetName ,@suburb ,@zipCode,@streetNo ,@complexName ,@houseNo ,@cityId 
			IF EXISTS (SELECT addressId FROM [Address] WHERE addressId = @addressId)
				BEGIN
					UPDATE [Address]
					SET	streetName= @streetName, 
						suburb = @suburb, 
						zipCode = @zipCode, 
						streetNo = @streetNo, 
						complexName = @complexName, 
						houseNo = @houseNo, 
						cityId = @cityId
					WHERE addressId = @addressId
				END
			ELSE
				BEGIN		
					INSERT INTO [Address]
					VALUES (@StreetName, @Suburb, @ZipCode, @StreetNo, @ComplexName, @HouseNo, @CityId)
					SET @addressId = SCOPE_IDENTITY()
				END
			
			SET @Error = 0 
			SELECT @addressId [addressId] , 1 [success] , NULL [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
			COMMIT
		END TRY
		BEGIN CATCH
			ROLLBACK
			EXEC p_Insert_Error @Error OUTPUT
			SELECT null [addressId] , 0 [success] , @Error [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
		END CATCH

END
GO

