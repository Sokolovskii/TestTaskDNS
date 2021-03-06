﻿using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TestTask.Models;
using NLog;
using NLog.Web;
using System;
using TestTask.Repository;
using TestTask.Report;

namespace TestTask.Controllers
{
	[Route("api/person")]
	[Produces("application/json")]
	public class PersonController : Controller
	{
		public readonly Logger logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();

		private readonly IPersonRepository Repository;
		public PersonController(IPersonRepository repository)
		{
			logger.Info("Создан контроллер для API");
			this.Repository = repository;
		}

		/// <summary>
		/// Получение всех сотрудников
		/// </summary>
		/// <returns>Список сотрудников</returns>
		[HttpGet("GetAllPersons")]
		public List<Person> GetPersons()
		{
			logger.Info("Начало запроса людей для таблицы");
			try
			{
				var persons = Repository.GetAllPersons();
				logger.Info("Люди для таблицы готовы");
				return persons;
			}
			catch (Exception ex)
			{
				logger.Info($"Список не создан, возникла ошибка: {ex}");
				return null;
			}

		}
		/// <summary>
		/// Добавление сотрудника
		/// </summary>
		/// <param name="person">Запись для добавления</param>
		/// <returns>id сотрудника</returns>
		[HttpPost("Add")]
		public int AddPerson([FromBody]Person person)
		{
			logger.Info("Начало создания записи");
			try
			{
				int id = Repository.Add(person);
				logger.Info("запись создана");
				return id;
			}
			catch(Exception ex)
			{
				logger.Info($"Запись не создана, возникла ошибка: {ex}");
				return 0;
			}
			
			
		}

		/// <summary>
		/// Редактирование сотрудника
		/// </summary>
		/// <param name="person">Запись для редактирования</param>
		[HttpPost("Update")]
		public bool UpdatePerson([FromBody]Person person)
		{
			logger.Info("Начало изменения записи");
			try
			{
				Repository.Update(person);
				logger.Info("Запись изменена");
				return true;
			}
			catch (Exception ex)
			{
				logger.Info($"Запись не изменена, возникла ошибка: {ex}");
				return false;
			}

		}

		/// <summary>
		/// Удаление сотрудника
		/// </summary>
		/// <param name="person">Запись для удаления</param>
		[HttpPost]
		public bool Delete([FromBody]Person person)
		{
			logger.Info($"Начало удаления записи с Id: {person.Id}");
			try
			{
				Repository.Delete(person.Id);
				logger.Info($"Запись с Id: {person.Id} успешно удалена");
				return true;
			}
			catch (Exception ex)
			{
				logger.Error($"Случилось исключение типа: {ex}, исправьте");
				return false;
			}
		}

		/// <summary>
		/// Получение excel-таблицы
		/// </summary>
		/// <returns>Таблица excel</returns>
		[HttpGet("excel")]
		public IActionResult CreateExcelFile()
		{
			byte[] byteTable;
			logger.Info("Начало создания Excel файла");
			try
			{
				var persons = Repository.GetAllPersons();
				byteTable = ExcelRender.GetByteTable(persons);

				logger.Info("Файл Excel успешно создан");

				return File(
				fileContents: byteTable,
				contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				fileDownloadName: "Persons.xlsx");
			}
			catch(Exception ex)
			{
				byteTable = null;
				logger.Info($"Файл excel не создан, произошла ошибка: {ex}");
				return null;
			}
		}
	}
}