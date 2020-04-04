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

		public PersonRepository()
		{
			//connectionString = Configuration.GetConnectionString("DefaultConnection");
		}

		public void Delete(int id)
		{
			string sqlExpression = "DeletePerson";
			using (SqlConnection connection = new SqlConnection(connectionString))
			{
				connection.Open();
				SqlCommand command = new SqlCommand(sqlExpression, connection);
				command.CommandType = System.Data.CommandType.StoredProcedure;

				MakeAndAddSqlParameter("id", id, command);
				var result = command.ExecuteNonQuery();
			}
		}

		public List<Person> GetAllPersons()
		{
			string sqlExpression = "GetAllPersons";
			var persons = new List<Person>();
			using (SqlConnection connection = new SqlConnection(connectionString))
			{
				connection.Open();
				SqlCommand command = new SqlCommand(sqlExpression, connection);
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

		//public List<Person> GetStructedManagers(int id)
		//{
		//	string sqlExpressionGetPerson = "GetPerson";
		//	var managers = new List<Person>();
		//	using (SqlConnection connection = new SqlConnection(connectionString))
		//	{
		//		SqlCommand command = new SqlCommand(sqlExpressionGetPerson, connection);
		//		command.CommandType = System.Data.CommandType.StoredProcedure;

		//		SqlParameter sqlParameterId = new SqlParameter
		//		{
		//			ParameterName = "@Id",
		//			Value = id
		//		};
		//		command.Parameters.Add(sqlParameterId);

		//		int ManagerIdForCheck = 1;
		//		while(ManagerIdForCheck > 0)
		//		{
		//			connection.Open();
		//			var reader = command.ExecuteReader();
		//			reader.Read();
		//			var person = new Person
		//			{
		//				Id = reader.GetInt32(0),
		//				Name = reader.GetString(1),
		//				EmploymentDate = reader.GetDateTime(2).ToShortDateString(),
		//				Position = reader.GetString(3),
		//				Order = reader.GetString(4),
		//				ManagerId = reader.IsDBNull(5) ? -1 : reader.GetInt32(5)
		//			};
		//			ManagerIdForCheck = person.ManagerId;
		//			managers.Add(person);
		//			sqlParameterId.Value = person.ManagerId;
		//			connection.Close();
		//		}	
		//	}
		//	managers.Reverse();
		//	return managers;
		//}

		public Person GetPerson(int id)
		{
			string sqlExpression = "GetPerson";
			var person = new Person { };
			using(SqlConnection connection = new SqlConnection(connectionString))
			{
				connection.Open();
				SqlCommand command = new SqlCommand(sqlExpression, connection);
				command.CommandType = System.Data.CommandType.StoredProcedure;

				MakeAndAddSqlParameter("Id", id, command);
				var reader = command.ExecuteReader();

				if (reader.HasRows)
				{
					reader.Read();
					person.Id = reader.GetInt32(0);
					person.Name = reader.GetString(1);
					person.EmploymentDate = reader.GetDateTime(2).ToShortDateString();
					person.Position = reader.GetString(3);
					person.Order = reader.GetString(4);
					person.ManagerId = reader.IsDBNull(5) ? -1 : reader.GetInt32(5);
				}
				connection.Close();
			}
			return person;
		}

		public int Add(Person person)
		{
			string sqlExpressionAdd = "AddNewPerson";
			using(SqlConnection connection = new SqlConnection(connectionString))
			{
				connection.Open();
				SqlCommand commandAdd = new SqlCommand(sqlExpressionAdd, connection);
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

		public void Update(Person person)
		{
			string sqlExpressionUpdate = "UpdatePerson";

			using (SqlConnection connection = new SqlConnection(connectionString))
			{
				connection.Open();
				SqlCommand commandUpdate = new SqlCommand(sqlExpressionUpdate, connection);
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
