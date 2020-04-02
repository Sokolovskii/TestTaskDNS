﻿using System;

namespace TestTask.Models
{
	[Serializable]
	public class Person
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Position { get; set; }
		public string EmploymentDate { get; set; }
		public string Order { get; set; }
		public Person Manager { get; set; }
		public int ManagerId { get; set; }
		public bool IsRemoved { get; set; }
	}
}
