if not exists(select * from sys.databases 
	where name='TestDataBase')
begin
	create database TestDataBase
end
go

use [TestDataBase]
go

if not exists(select * from INFORMATION_SCHEMA.COLUMNS
	where TABLE_NAME='Persons')
begin
	create table Persons
	(
		[Id] int identity(1,1) not null,
		[Name] nvarchar(max) not null,
		[EmploymentDate] date not null,
		[Position] nvarchar(max) not null,
		[Order] nvarchar(max) not null,
		[ManagerId] int null,
		[RemoveFlag] bit not null,

		constraint PK_Persons primary key(Id),
		constraint FK_Persons_Persons_ManagerId foreign key (ManagerId) references dbo.Persons(Id)
	)
end
go

if not exists(select * from Persons)
begin
	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Хорус Луперкаль', 1998-01-25, 'Примарх Лунных Волков', 'Предатели', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Леман Русс', 10001, 'Примарх Космических Волков', 'Лоялисты', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Лион Эль-Джонсон', 10002, 'Примарх Темных Ангелов', 'Лоялисты', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Пертурабо', 10003, 'Примарх Железных Воинов', 'Предатели', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Магнус Рыжий', 10004, 'Примарх Тысячи Сынов', 'Предатели', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Фулгрим', 10005, 'Примарх Детей Императора', 'Предатели', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Феррус Манус', 10006, 'Примарх Железных Рук', 'Предатели', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Корвус Коракс', 10007, 'Примарх Гвардии Ворона', 'Лоялисты', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Лоргар Аврелиан', 10008, 'Примарх Несущих Слово', 'Предатели', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Робут Гиллиман', 10009, 'Примарх Ультрамаринов', 'Лоялисты', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Ангрон', 10010, 'Примарх Пожирателей Миров', 'Предатели', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Мортарион', 10011, 'Примарх Гвардии Смерти', 'Предатели', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Джагатай Хан', 10012, 'Примарх Белых Шрамов', 'Лоялисты', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Вулкан', 10013, 'Примарх Саламандр', 'Лоялисты', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Рогал Дорн', 10014, 'Примарх Имперских Кулаков', 'Лоялисты', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Конрад Керз', 10015, 'Примарх Повелителей Ночи', 'Предатели', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Альфарий', 10016, 'Примарх Альфа-Легиона', 'Предатели', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('Сангвиний', 10017, 'Примарх Кровавых Ангелов', 'Лоялисты', 0);

	update Persons set ManagerId=2 where Id=1;
	update Persons set ManagerId=7 where Id=2;
	update Persons set ManagerId=18 where Id=4;
	update Persons set ManagerId=3 where Id=8;
	update Persons set ManagerId=9 where Id=11;
	update Persons set ManagerId=5 where Id=7;
	update Persons set ManagerId=14 where Id=12;
	update Persons set ManagerId=17 where Id=1;
end