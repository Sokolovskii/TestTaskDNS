USE [TestDataBase]
GO
/****** Object:  StoredProcedure [dbo].[DeletePerson]    Script Date: 01.04.2020 19:07:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[DeletePerson]
	@Id INT
AS
BEGIN
	UPDATE Persons SET RemoveFlag=1 WHERE Id=@Id;
END