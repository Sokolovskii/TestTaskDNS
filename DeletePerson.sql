USE [TestDataBase]
GO
/****** Object:  StoredProcedure [dbo].[DeletePerson]    Script Date: 01.04.2020 19:07:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[DeletePerson]
	@Id int
as
begin
	update Persons set RemoveFlag=1 where Id=@Id;
end