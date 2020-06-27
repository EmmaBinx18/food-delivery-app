
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
	EXEC p_Create_Update_Category '{ "id" : -1, "name" : "Category Name", "description" : "Category Description"}', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Category]
*/
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Create_Update_Category')
	DROP PROCEDURE [dbo].p_Create_Update_Category
GO

CREATE PROCEDURE p_Create_Update_Category 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		DECLARE @id INT,
				@name VARCHAR(55),
				@description VARCHAR(MAX)
		SELECT @id = id, @name=[name], @description = [description]
		FROM OPENJSON(@JSON)
		WITH (id INT, [name] VARCHAR(55),[description] VARCHAR(MAX) )
			
		IF EXISTS (SELECT id FROM [Category] WHERE id = @id)
			BEGIN
				UPDATE [Category]
				SET	[name]= @name, 
					[description] = @description
				WHERE id = @id
			END
		ELSE
			BEGIN		
				INSERT INTO [Category]
				VALUES (@name, @description)
				SET @id = SCOPE_IDENTITY()
			END
			
		SET @Error = 0 
	END TRY
	BEGIN CATCH
		EXEC p_Insert_Error @Error OUTPUT
	END CATCH

END
GO

