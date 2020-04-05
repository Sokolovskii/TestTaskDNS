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
	VALUES('Хорус Луперкаль', 1998-01-25, 'Примарх Лунных Волков', 'Предатели', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Леман Русс', 10001, 'Примарх Космических Волков', 'Лоялисты', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Лион Эль-Джонсон', 10002, 'Примарх Темных Ангелов', 'Лоялисты', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Пертурабо', 10003, 'Примарх Железных Воинов', 'Предатели', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Магнус Рыжий', 10004, 'Примарх Тысячи Сынов', 'Предатели', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Фулгрим', 10005, 'Примарх Детей Императора', 'Предатели', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Феррус Манус', 10006, 'Примарх Железных Рук', 'Предатели', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Корвус Коракс', 10007, 'Примарх Гвардии Ворона', 'Лоялисты', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Лоргар Аврелиан', 10008, 'Примарх Несущих Слово', 'Предатели', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Робут Гиллиман', 10009, 'Примарх Ультрамаринов', 'Лоялисты', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Ангрон', 10010, 'Примарх Пожирателей Миров', 'Предатели', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Мортарион', 10011, 'Примарх Гвардии Смерти', 'Предатели', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Джагатай Хан', 10012, 'Примарх Белых Шрамов', 'Лоялисты', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Вулкан', 10013, 'Примарх Саламандр', 'Лоялисты', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Рогал Дорн', 10014, 'Примарх Имперских Кулаков', 'Лоялисты', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Конрад Керз', 10015, 'Примарх Повелителей Ночи', 'Предатели', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Альфарий', 10016, 'Примарх Альфа-Легиона', 'Предатели', 0);

	INSERT INTO Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	VALUES('Сангвиний', 10017, 'Примарх Кровавых Ангелов', 'Лоялисты', 0);

	UPDATE Persons SET ManagerId=2 WHERE Id=1;
	UPDATE Persons SET ManagerId=7 WHERE Id=2;
	UPDATE Persons SET ManagerId=18 WHERE Id=4;
	UPDATE Persons SET ManagerId=3 WHERE Id=8;
	UPDATE Persons SET ManagerId=9 WHERE Id=11;
	UPDATE Persons SET ManagerId=5 WHERE Id=7;
	UPDATE Persons SET ManagerId=14 WHERE Id=12;
	UPDATE Persons SET ManagerId=17 WHERE Id=1;
END