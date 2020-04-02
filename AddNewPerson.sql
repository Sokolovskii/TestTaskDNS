USE [TestDataBase]
GO
/****** Object:  StoredProcedure [dbo].[AddNewPerson]    Script Date: 02.04.2020 22:07:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

alter procedure [dbo].[AddNewPerson]
	@Name nvarchar(max),
	@EmploymentDate date,
	@Position nvarchar(max),
	@Order nvarchar(max),
	@ManagerId int
AS
begin
	insert into [Persons]([Name], [EmploymentDate], [Position], [Order],[ManagerId], [RemoveFlag])
	values(@Name, @EmploymentDate, @Position, @Order, @ManagerId, 0);
	select @@IDENTITY;
end