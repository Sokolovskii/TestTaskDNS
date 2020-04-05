USE [TestDataBase]
GO
/****** Object:  StoredProcedure [dbo].[GetAllPersons]    Script Date: 01.04.2020 19:07:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[GetAllPersons] AS
BEGIN
	SELECT [Id],[Name],[EmploymentDate],[Position],[Order],[ManagerId]
	FROM Persons 
	WHERE [RemoveFlag]=0;
END