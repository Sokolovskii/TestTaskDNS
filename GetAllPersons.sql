USE [TestDataBase]
GO
/****** Object:  StoredProcedure [dbo].[GetAllPersons]    Script Date: 01.04.2020 19:07:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[GetAllPersons] as
begin
	select [Id],[Name],[EmploymentDate],[Position],[Order],[ManagerId]
	from Persons 
	where [RemoveFlag]=0;
end