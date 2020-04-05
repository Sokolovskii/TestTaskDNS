USE [TestDataBase]
GO
/****** Object:  StoredProcedure [dbo].[GetPerson]    Script Date: 01.04.2020 19:08:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[GetPerson]
	@Id INT
AS
BEGIN
	SELECT [Id],[Name],[EmploymentDate],[Position],[Order],[ManagerId]
	FROM Persons
	WHERE Id=@Id;
END