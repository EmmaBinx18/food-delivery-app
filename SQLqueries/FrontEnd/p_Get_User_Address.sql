SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Susan van Zyl
-- Create date: 2020-06-26
-- Description:	Find a users's address(es) given the user id- returns JSON string
-- 
-- Usage:   
/*
	DECLARE @Error int 
	EXEC p_Get_User_Address '{ "userId" : "PiAfL1byyDf6UypJYUmCC9iLP712" }', @Error OUTPUT
	SELECT * FROM ErrorTracer WHERE ErrorID = @Error
*/
-- =============================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P'AND name = 'p_Get_User_Address')
	DROP PROCEDURE [dbo].[p_Get_User_Address]
GO

CREATE PROCEDURE p_Get_User_Address 
	@JSON VARCHAR(MAX),
	@Error INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @userId VARCHAR(128)
	SELECT @userId = userId
	FROM OPENJSON(@JSON) 
	WITH (userId VARCHAR(128) )

	

	;WITH selected_user AS
	(
		SELECT U.userId from [Users] U where U.userId = @userId
	)
	SELECT su.userId, CASE WHEN oa.locations IS NULL THEN 0  ELSE null END [results] , oa.locations
	FROM selected_user su
	INNER JOIN 
	(
	
			SELECT
				userId,
				JSON_QUERY(Locations,'$') AS [locations]
			FROM
				selected_user h
				CROSS APPLY
				(
				SELECT 
					(
						SELECT A.addressId, a.[address], JSON_QUERY(CONCAT('[',A.LatLong.Lat,',',A.LatLong.Long,  ']')) [coordinates]
						FROM selected_user su
						INNER JOIN UserAddress c 
							ON c.userId = su.userId
						INNER JOIN [Address] A 
							ON A.addressId = c.addressId
						FOR JSON PATH
					) AS Locations
				) d	
	) oa ON su.userId = oa.userId
	
	FOR JSON PATH

	SET @Error = 0
END
GO

