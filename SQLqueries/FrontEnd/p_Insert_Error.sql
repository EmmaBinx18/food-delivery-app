
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Susan van Zyl
-- Create date: 23-06-2020
-- Description:	Insert Error into ErrorTracer table
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Insert_Error')
	DROP PROCEDURE [dbo].[p_Insert_Error]
GO

CREATE PROCEDURE p_Insert_Error 
	@ErrorId INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON 
	SET XACT_ABORT ON 
	DECLARE @ErrorNumber VARCHAR(MAX)  
	DECLARE @ErrorState VARCHAR(MAX)  
	DECLARE @ErrorSeverity VARCHAR(MAX)  
	DECLARE @ErrorLine VARCHAR(MAX)  
	DECLARE @ErrorProc VARCHAR(MAX)  
	DECLARE @ErrorMesg VARCHAR(MAX)  
	DECLARE @vUserName VARCHAR(MAX)  
	DECLARE @vHostName VARCHAR(MAX) 
    SELECT  @ErrorNumber = ERROR_NUMBER()  
       ,@ErrorState = ERROR_STATE()  
       ,@ErrorSeverity = ERROR_SEVERITY()  
       ,@ErrorLine = ERROR_LINE()  
       ,@ErrorProc = ERROR_PROCEDURE()  
       ,@ErrorMesg = ERROR_MESSAGE()  
       ,@vUserName = SUSER_SNAME()  
       ,@vHostName = Host_NAME()  
	INSERT INTO ErrorTracer(ErrorNumber,ErrorState,ErrorSeverity,ErrorLine,ErrorProc,ErrorMsg,UserName,HostName,ErrorDate)  
	VALUES(@ErrorNumber,@ErrorState,@ErrorSeverity,@ErrorLine,@ErrorProc,@ErrorMesg,@vUserName,@vHostName,GETDATE())  

	SET @ErrorId = (SELECT SCOPE_IDENTITY())
END
GO
