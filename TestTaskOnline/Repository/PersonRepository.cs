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

				SqlParameter sqlParameter = new SqlParameter
				{
					ParameterName = "@Id",
					Value = id
				};
				command.Parameters.Add(sqlParameter);
				var result = command.ExecuteNonQuery();
			}
		}  //перенесено на ADO.NET

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
		}  //Перенесено на ADO.NET

		public List<Person> GetStructedManagers(int id)
		{
			string sqlExpressionGetPerson = "GetPerson";
			var managers = new List<Person>();
			using (SqlConnection connection = new SqlConnection(connectionString))
			{
				SqlCommand command = new SqlCommand(sqlExpressionGetPerson, connection);
				command.CommandType = System.Data.CommandType.StoredProcedure;

				SqlParameter sqlParameterId = new SqlParameter
				{
					ParameterName = "@Id",
					Value = id
				};
				command.Parameters.Add(sqlParameterId);

				int ManagerIdForCheck = 1;
				while(ManagerIdForCheck > 0)
				{
					connection.Open();
					var reader = command.ExecuteReader();
					reader.Read();
					var person = new Person
					{
						Id = reader.GetInt32(0),
						Name = reader.GetString(1),
						EmploymentDate = reader.GetDateTime(2).ToShortDateString(),
						Position = reader.GetString(3),
						Order = reader.GetString(4),
						ManagerId = reader.IsDBNull(5) ? -1 : reader.GetInt32(5)
					};
					ManagerIdForCheck = person.ManagerId;
					managers.Add(person);
					sqlParameterId.Value = person.ManagerId;
					connection.Close();
				}	
			}
			managers.Reverse();
			return managers;
		}

		public Person GetPerson(int id)
		{
			string sqlExpression = "GetPerson";
			var person = new Person { };
			using(SqlConnection connection = new SqlConnection(connectionString))
			{
				connection.Open();
				SqlCommand command = new SqlCommand(sqlExpression, connection);
				command.CommandType = System.Data.CommandType.StoredProcedure;

				SqlParameter sqlParameterId = new SqlParameter
				{
					ParameterName = "@Id",
					Value = id
				};
				command.Parameters.Add(sqlParameterId);
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
		}   //Перевел на ADO.NET

		public int Add(Person person)
		{
			string sqlExpressionAdd = "AddNewPerson";
			using(SqlConnection connection = new SqlConnection(connectionString))
			{
				connection.Open();
				SqlCommand commandAdd = new SqlCommand(sqlExpressionAdd, connection);
				commandAdd.CommandType = System.Data.CommandType.StoredProcedure;
				
				SqlParameter sqlParameterName = new SqlParameter
				{
					ParameterName = "@Name",
					Value = person.Name
				};
				SqlParameter sqlParameterEmploymentDate = new SqlParameter
				{
					ParameterName = "@EmploymentDate",
					Value = person.EmploymentDate
				};
				SqlParameter sqlParameterPosition = new SqlParameter
				{
					ParameterName = "@Position",
					Value = person.Position
				};
				SqlParameter sqlParameterOrder = new SqlParameter
				{
					ParameterName = "@Order",
					Value = person.Order
				};
				SqlParameter sqlParameterManagerId = new SqlParameter
				{
					ParameterName = "@ManagerId",
					Value = person.ManagerId
				};

				commandAdd.Parameters.Add(sqlParameterName);
				commandAdd.Parameters.Add(sqlParameterEmploymentDate);
				commandAdd.Parameters.Add(sqlParameterPosition);
				commandAdd.Parameters.Add(sqlParameterOrder);
				commandAdd.Parameters.Add(sqlParameterManagerId);

				var result = commandAdd.ExecuteScalar();
				int id = Int32.Parse(result.ToString());
				connection.Close();
				return id;
			}
		}  //Перевел на ADO.NET

		public void Update(Person person)
		{
			string sqlExpressionUpdate = "UpdatePerson";

			using (SqlConnection connection = new SqlConnection(connectionString))
			{
				connection.Open();
				SqlCommand commandUpdate = new SqlCommand(sqlExpressionUpdate, connection);
				commandUpdate.CommandType = System.Data.CommandType.StoredProcedure;

				SqlParameter sqlParameterId = new SqlParameter
				{
					ParameterName = "@Id",
					Value = person.Id
				};
				SqlParameter sqlParameterName = new SqlParameter
				{
					ParameterName = "@Name",
					Value = person.Name
				};
				SqlParameter sqlParameterEmploymentDate = new SqlParameter
				{
					ParameterName = "@EmploymentDate",
					Value = person.EmploymentDate
				};
				SqlParameter sqlParameterPosition = new SqlParameter
				{
					ParameterName = "@Position",
					Value = person.Position
				};
				SqlParameter sqlParameterOrder = new SqlParameter
				{
					ParameterName = "@Order",
					Value = person.Order
				};
				SqlParameter sqlParameterManagerId = new SqlParameter
				{
					ParameterName = "@ManagerId",
					Value = person.ManagerId
				};

				commandUpdate.Parameters.Add(sqlParameterId);
				commandUpdate.Parameters.Add(sqlParameterName);
				commandUpdate.Parameters.Add(sqlParameterEmploymentDate);
				commandUpdate.Parameters.Add(sqlParameterPosition);
				commandUpdate.Parameters.Add(sqlParameterOrder);
				commandUpdate.Parameters.Add(sqlParameterManagerId);

				var result = commandUpdate.ExecuteNonQuery();
				connection.Close();
			}
		}  //Перевел на ADO.NET
	}
}
