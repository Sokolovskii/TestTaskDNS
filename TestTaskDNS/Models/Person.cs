using System;

namespace TestTask.Models
{
	[Serializable]
	public class Person
	{
		/// <summary>
		/// Идентификатор сотрудника
		/// </summary>
		public int Id { get; set; }
		
		/// <summary>
		/// Имя сотрудника
		/// </summary>
		public string Name { get; set; }

		/// <summary>
		/// Должность сотрудника
		/// </summary>
		public string Position { get; set; }

		/// <summary>
		/// Дата приема сотрудника
		/// </summary>
		public string EmploymentDate { get; set; }
		
		/// <summary>
		/// Отдел сотрудника
		/// </summary>
		public string Order { get; set; }

		/// <summary>
		/// Непосредственный руководитель сотрудника
		/// </summary>
		public Person Manager { get; set; }

		/// <summary>
		/// Идентификатор руководителя сотрудника
		/// </summary>
		public int ManagerId { get; set; }
	}
}
