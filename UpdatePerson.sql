USE [TestDataBase]
GO
/****** Object:  StoredProcedure [dbo].[UpdatePerson]    Script Date: 01.04.2020 19:08:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[UpdatePerson]
	@Id int,
	@Name nvarchar(max),
	@EmploymentDate date,
	@Position nvarchar(max),
	@Order nvarchar(max),
	@ManagerId int
as
begin
	update Persons set 
		[Name]=@Name, 
		[EmploymentDate]=@EmploymentDate, 
		[Position]=@Position, 
		[Order]=@Order,
		[ManagerId]=@ManagerId
		where [Id]=@Id;
end
