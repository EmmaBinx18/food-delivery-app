SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find a driver's address given the user id, or return all drivers with their addreses when given null - returns JSON string
-- 
-- Usage:   
/*
	DECLARE @Error int 
	--EXEC p_Get_Driver '{ "userId" : "null" }', @Error OUTPUT 
	EXEC p_Get_Driver '{ "userId" : "driver_uid" }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
	SELECT * FROM [DriverAddress]
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_Driver')
	DROP PROCEDURE [dbo].[p_Get_Driver]
GO

CREATE PROCEDURE p_Get_Driver 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @userId VARCHAR(128)
	SELECT @userId = userId
	FROM OPENJSON(@JSON) 
	WITH (userId VARCHAR(128) )

	IF (@userId IS NULL)
		BEGIN
			SELECT U.*,JSON_QUERY(CONCAT('[',A.LatLong.Lat,',',A.LatLong.Long,  ']')) [coordinates] 
			FROM [Users] U
			INNER JOIN [UserRole] UR ON UR.UserId = U.userId  AND UR.RoleId = 2
			INNER JOIN [DriverAddress] DA ON DA.UserId = U.UserId
			INNER JOIN [Address] A ON A.addressId = DA.addressId
			FOR JSON PATH	 
			
			
		END
	ELSE
		BEGIN
			SELECT U.*,JSON_QUERY(CONCAT('[',A.LatLong.Lat,',',A.LatLong.Long,  ']')) [coordinates] 
			FROM [Users] U
			INNER JOIN [UserRole] UR ON UR.UserId = U.userId  AND UR.RoleId = 2 AND  U.userId = @userId
			INNER JOIN [DriverAddress] DA ON DA.UserId = U.UserId
			INNER JOIN [Address] A ON A.addressId = DA.addressId
			FOR JSON PATH	
		END
	SET @Error = 0
END
GO

