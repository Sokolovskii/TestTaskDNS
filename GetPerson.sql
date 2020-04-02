USE [TestDataBase]
GO
/****** Object:  StoredProcedure [dbo].[GetPerson]    Script Date: 01.04.2020 19:08:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[GetPerson]
	@Id int
as
begin
	select [Id],[Name],[EmploymentDate],[Position],[Order],[ManagerId]
	from Persons
	where Id=@Id;
end