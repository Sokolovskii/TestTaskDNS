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
	values('����� ���������', 1998-01-25, '������� ������ ������', '���������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('����� ����', 10001, '������� ����������� ������', '��������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('���� ���-�������', 10002, '������� ������ �������', '��������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('���������', 10003, '������� �������� ������', '���������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('������ �����', 10004, '������� ������ �����', '���������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('�������', 10005, '������� ����� ����������', '���������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('������ �����', 10006, '������� �������� ���', '���������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('������ ������', 10007, '������� ������� ������', '��������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('������ ��������', 10008, '������� ������� �����', '���������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('����� ��������', 10009, '������� �������������', '��������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('������', 10010, '������� ����������� �����', '���������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('���������', 10011, '������� ������� ������', '���������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('�������� ���', 10012, '������� ����� ������', '��������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('������', 10013, '������� ���������', '��������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('����� ����', 10014, '������� ��������� �������', '��������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('������ ����', 10015, '������� ����������� ����', '���������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('��������', 10016, '������� �����-�������', '���������', 0);

	insert into Persons([Name], [EmploymentDate], [Position], [Order], [RemoveFlag])
	values('���������', 10017, '������� �������� �������', '��������', 0);

	update Persons set ManagerId=2 where Id=1;
	update Persons set ManagerId=7 where Id=2;
	update Persons set ManagerId=18 where Id=4;
	update Persons set ManagerId=3 where Id=8;
	update Persons set ManagerId=9 where Id=11;
	update Persons set ManagerId=5 where Id=7;
	update Persons set ManagerId=14 where Id=12;
	update Persons set ManagerId=17 where Id=1;
end