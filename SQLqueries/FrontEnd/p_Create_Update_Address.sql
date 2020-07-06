
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-23
-- Description:	Add Address and returns address id, register addess with user when userid specified
-- Usage : 
 /*

	DECLARE @Error int 
	EXEC p_Create_Update_Address '{ "addressId" : -1, "address": "sample address", "geometry" : {"type":"Point","coordinates":[35.70611,37.36833]} , "userId" : null}', @Error OUTPUT
	--EXEC p_Create_Update_Address '{ "addressId" : -1, "address": "sample address", "geometry" : {"type":"Point","coordinates":[35.70611,37.36833]} , "userId" : "user_uid"}', @Error OUTPUT
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
					@address NVARCHAR(255),
					@latLong GEOGRAPHY,
					@userId VARCHAR(128)


			SELECT @addressId = addressId, @address = [address], @latLong = GEOGRAPHY::Point(JSON_VALUE([geometry],'$.coordinates[0]'), JSON_VALUE([geometry],'$.coordinates[1]') , 4326) , @userId = userId
			FROM OPENJSON(@JSON)
			WITH (addressId INT, [address] VARCHAR(255), [geometry] NVARCHAR(MAX) AS JSON, userId VARCHAR(128))

			IF EXISTS (SELECT addressId FROM [Address] WHERE addressId = @addressId)
				BEGIN
					UPDATE [Address] 
						SET	[address] = @address,
							[latLong] = @latLong
					WHERE addressId = @addressId
				END
			ELSE
				BEGIN		
					INSERT INTO [Address]
					VALUES (@address, @latLong)

					SET @addressId = SCOPE_IDENTITY()

					IF (@userId IS NOT NULL)
					BEGIN
						INSERT INTO [UserAddress]
						VALUES (@userId, @addressId)
					END
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

