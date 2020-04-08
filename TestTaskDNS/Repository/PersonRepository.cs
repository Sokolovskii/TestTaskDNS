using System;
using System.Collections.Generic;
using System.Linq;
using TestTask.Models;
using System.Data.SqlClient;

namespace TestTask.Repository
{
	public class PersonRepository : IPersonRepository
	{
		string connectionString = "Data Source =.\\SQLEXPRESS;Initial Catalog = TestDataBase; Integrated Security = True";

		///<summary>
		///Формирует запрос на удаление записи из БД
		///</summary>
		public void Delete(int id)
		{
			var sqlExpression = "DeletePerson";
			using (SqlConnection connection = new SqlConnection(connectionString))
			{
				connection.Open();
				var command = new SqlCommand(sqlExpression, connection);
				command.CommandType = System.Data.CommandType.StoredProcedure;

				MakeAndAddSqlParameter("id", id, command);
				var result = command.ExecuteNonQuery();
			}
		}

		///<summary>
		///Формирует запрос на получение всех записей из БД
		///</summary>
		public List<Person> GetAllPersons()
		{
			var sqlExpression = "GetAllPersons";
			var persons = new List<Person>();
			using (SqlConnection connection = new SqlConnection(connectionString))
			{
				connection.Open();
				var command = new SqlCommand(sqlExpression, connection);
				command.CommandType = System.Data.CommandType.StoredProcedure;
				var reader = command.ExecuteReader();
				
				if(reader.HasRows)
				{

					while (reader.Read())
					{
						var person = new Person
						{
							Id = reader.GetInt32(0),
							Name = reader.GetString(1),
							EmploymentDate = reader.GetDateTime(2).ToShortDateString(),
							Position = reader.GetString(3),
							Order = reader.GetString(4),
							ManagerId = reader.IsDBNull(5)? -1 : reader.GetInt32(5)
						};
						persons.Add(person);
					}
				}
				reader.Close();
			}
			foreach (var person in persons)
			{
				var manager = persons.SingleOrDefault(p => p.Id == person.ManagerId);
				person.Manager = manager;
			}
			return persons;
		}

		///<summary>
		///Формирует запрос на добавление записи в БД
		///</summary>
		public int Add(Person person)
		{
			var sqlExpressionAdd = "AddNewPerson";
			using(SqlConnection connection = new SqlConnection(connectionString))
			{
				connection.Open();
				var commandAdd = new SqlCommand(sqlExpressionAdd, connection);
				commandAdd.CommandType = System.Data.CommandType.StoredProcedure;

				MakeAndAddSqlParameter("Name", person.Name, commandAdd);
				MakeAndAddSqlParameter("EmploymentDate", person.EmploymentDate, commandAdd);
				MakeAndAddSqlParameter("Position", person.Position, commandAdd);
				MakeAndAddSqlParameter("Order", person.Order, commandAdd);
				MakeAndAddSqlParameter("ManagerId", person.ManagerId, commandAdd);

				var result = commandAdd.ExecuteScalar();
				int id = Int32.Parse(result.ToString());
				connection.Close();
				return id;
			}
		}

		///<summary>
		///Формирует запрос на обновление записи в БД
		///</summary>
		public void Update(Person person)
		{
			var sqlExpressionUpdate = "UpdatePerson";

			using (SqlConnection connection = new SqlConnection(connectionString))
			{
				connection.Open();
				var commandUpdate = new SqlCommand(sqlExpressionUpdate, connection);
				commandUpdate.CommandType = System.Data.CommandType.StoredProcedure;

				MakeAndAddSqlParameter("Id", person.Id, commandUpdate);
				MakeAndAddSqlParameter("Name", person.Name, commandUpdate);
				MakeAndAddSqlParameter("EmploymentDate", person.EmploymentDate, commandUpdate);
				MakeAndAddSqlParameter("Position", person.Position, commandUpdate);
				MakeAndAddSqlParameter("Order", person.Order, commandUpdate);
				MakeAndAddSqlParameter("ManagerId", person.ManagerId, commandUpdate);

				var result = commandUpdate.ExecuteNonQuery();
				connection.Close();
			}
		}

		///<summary>
		///Формирует и добавляет в SQL-запрос входной параметр
		///</summary>
		public void MakeAndAddSqlParameter(string parameterName, object value, SqlCommand sqlCommand)
		{
			var sqlParameter = new SqlParameter
			{
				ParameterName = "@" + parameterName,
				Value = value
			};
			sqlCommand.Parameters.Add(sqlParameter);
		}
	}
}
