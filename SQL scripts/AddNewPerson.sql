USE [TestDataBase]
GO
/****** Object:  StoredProcedure [dbo].[AddNewPerson]    Script Date: 02.04.2020 22:07:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[AddNewPerson]
	@Name NVARCHAR(MAX),
	@EmploymentDate DATE,
	@Position NVARCHAR(MAX),
	@Order NVARCHAR(MAX),
	@ManagerId INT
AS
BEGIN
	INSERT INTO [Persons]([Name], [EmploymentDate], [Position], [Order],[ManagerId], [RemoveFlag])
	VALUES(@Name, @EmploymentDate, @Position, @Order, @ManagerId, 0);
	SELECT @@IDENTITY;
END