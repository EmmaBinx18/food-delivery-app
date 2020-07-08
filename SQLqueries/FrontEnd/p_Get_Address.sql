SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find addres given an address id - returns JSON string
-- 
-- Usage:   
/*
	DECLARE @Error int 
	EXEC p_Get_Address '{ "addressId" : 1 }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [Address]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Address')
	DROP PROCEDURE [dbo].p_Get_Address
GO

CREATE PROCEDURE p_Get_Address
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT 
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @addressId INT
	SELECT @addressId = addressId
	FROM OPENJSON(@JSON) 
	WITH (addressId INT )

	SELECT A.[addressId], A.[address], JSON_QUERY(CONCAT('[',A.LatLong.Lat,',',A.LatLong.Long,  ']')) [coordinates] 
	FROM [Address] A 
	WHERE A.addressId = @addressId
	FOR JSON PATH	 

	SET @Error = 0
END
GO
