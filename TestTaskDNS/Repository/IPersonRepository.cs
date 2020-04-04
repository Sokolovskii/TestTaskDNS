using System.Collections.Generic;
using TestTask.Models;
using System.Data.SqlClient;

namespace TestTask.Repository
{
	public interface IPersonRepository
	{
		List<Person> GetAllPersons();
		//List<Person> GetStructedManagers(int id);
		Person GetPerson(int id);
		void Delete(int id);
		int Add(Person person);
		void Update(Person person);
		public void MakeAndAddSqlParameter(string parameterName, object value, SqlCommand sqlCommand);
	}
}
