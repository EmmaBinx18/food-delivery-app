SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-27
-- Description:	Update location of given delivery id; 
-- 
-- Usage: 
 /*
    DECLARE @Error int 
	EXEC p_Update_Delivery_Tracking '{ "geometry" : {"type":"Point","coordinates":[32.70611,37.36833]} , "deliveryId" : 1}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Tracking]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Update_Delivery_Tracking')
	DROP PROCEDURE [dbo].p_Update_Delivery_Tracking
GO

CREATE PROCEDURE p_Update_Delivery_Tracking 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT

AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRANSACTION
		BEGIN TRY
			DECLARE @OrderStatusDId INT, @latLong GEOGRAPHY, @deliveryId INT
			
			SELECT @deliveryId = deliveryId , @latLong = GEOGRAPHY::Point(JSON_VALUE([geometry],'$.coordinates[0]'), JSON_VALUE([geometry],'$.coordinates[1]') , 4326)
			FROM OPENJSON(@JSON)
			WITH (deliveryId INT, [geometry] NVARCHAR(MAX) AS JSON, userId VARCHAR(128))
		
			IF EXISTS (SELECT deliveryId FROM [Tracking] WHERE deliveryId = @deliveryId)
			BEGIN
				UPDATE Tracking
					SET [latLong] = @latLong,
						[timeStamp] = GETDATE()
				WHERE deliveryId = @deliveryId
			END
			ELSE
			BEGIN
				INSERT INTO Tracking
				VALUES (@latLong, GETDATE(), @deliveryId)
			END

			SET @Error = 0
			SELECT 1 [success] , NULL [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
			COMMIT
		END TRY
		BEGIN CATCH
			ROLLBACK
			EXEC p_Insert_Error @Error OUTPUT
			SELECT 0 [success] , @Error [error] FOR JSON PATH, INCLUDE_NULL_VALUES 
		END CATCH
	
END
GO