USE [TestDataBase]
GO
/****** Object:  StoredProcedure [dbo].[UpdatePerson]    Script Date: 01.04.2020 19:08:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[UpdatePerson]
	@Id INT,
	@Name NVARCHAR(MAX),
	@EmploymentDate DATE,
	@Position NVARCHAR(MAX),
	@Order NVARCHAR(MAX),
	@ManagerId INT
AS
BEGIN
	UPDATE Persons SET
		[Name]=@Name, 
		[EmploymentDate]=@EmploymentDate, 
		[Position]=@Position, 
		[Order]=@Order,
		[ManagerId]=@ManagerId
		WHERE [Id]=@Id;
END
