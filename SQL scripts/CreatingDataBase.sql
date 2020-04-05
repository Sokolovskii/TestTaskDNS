IF not exists(SELECT * FROM sys.databases 
	WHERE name='TestDataBase')
BEGIN
	CREATE DATABASE TestDataBase
END
GO

USE [TestDataBase]
GO

IF not exists(SELECT * FROM INFORMATION_SCHEMA.COLUMNS
	WHERE TABLE_NAME='Persons')
BEGIN
	CREATE TABLE Persons
	(
		[Id] INT IDENTITY (1,1) not null,
		[Name] NVARCHAR(max) not null,
		[EmploymentDate] DATE not null,
		[Position] NVARCHAR(max) not null,
		[Order] NVARCHAR(max) not null,
		[ManagerId] INT null,
		[RemoveFlag] BIT not null,

		CONSTRAINT PK_Persons PRIMARY KEY(Id),
		CONSTRAINT FK_Persons_Persons_ManagerId FOREIGN KEY(ManagerId) REFERENCES dbo.Persons(Id)
	)
END
GO

IF not exists(SELECT * FROM Persons)
BEGIN
	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('����� ���������', 1998-01-25, '������� ������ ������', '���������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('����� ����', 10001, '������� ����������� ������', '��������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('���� ���-�������', 10002, '������� ������ �������', '��������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('���������', 10003, '������� �������� ������', '���������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('������ �����', 10004, '������� ������ �����', '���������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('�������', 10005, '������� ����� ����������', '���������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('������ �����', 10006, '������� �������� ���', '���������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('������ ������', 10007, '������� ������� ������', '��������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('������ ��������', 10008, '������� ������� �����', '���������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('����� ��������', 10009, '������� �������������', '��������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('������', 10010, '������� ����������� �����', '���������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('���������', 10011, '������� ������� ������', '���������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('�������� ���', 10012, '������� ����� ������', '��������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('������', 10013, '������� ���������', '��������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('����� ����', 10014, '������� ��������� �������', '��������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('������ ����', 10015, '������� ����������� ����', '���������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('��������', 10016, '������� �����-�������', '���������', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('���������', 10017, '������� �������� �������', '��������', 0);

	UPDATE Persons SET ManagerId=2 WHERE Id=1;
	UPDATE Persons SET ManagerId=7 WHERE Id=2;
	UPDATE Persons SET ManagerId=18 WHERE Id=4;
	UPDATE Persons SET ManagerId=3 WHERE Id=8;
	UPDATE Persons SET ManagerId=9 WHERE Id=11;
	UPDATE Persons SET ManagerId=5 WHERE Id=7;
	UPDATE Persons SET ManagerId=14 WHERE Id=12;
	UPDATE Persons SET ManagerId=17 WHERE Id=1;
END