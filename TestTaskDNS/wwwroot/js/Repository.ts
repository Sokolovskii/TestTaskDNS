class Repository {

    //Кэш репозитория, все записи, полученные от базы данных и редактированные в процессе работы приложения
    persons: Array<Person> = [];

    //Метод, позволяющий сортировать таблицу по возрастанию
    ByFieldUp(field) {
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }

    //Метод, позволяющий сортировать таблицу по убыванию
    ByFieldDown(field) {
        return (a, b) => a[field] < b[field] ? 1 : -1;
    }

    //Записывает записи из JSON в кэш
    PushPersons(personsJson: JSON): JSON {
        let length: number = Object.keys(personsJson).length;
        for (let i = 0; i < length; i++) {
            this.persons.push(personsJson[i]);
        }
        return personsJson
    }

    //Осуществляет проверку на замыкания в структуре подчиненности
    private ValidationCheckCircles(person: Person): boolean {
        let managerId = person.managerId;
        let ids: Array<number> = [person.id, managerId];
        while (managerId != -1) {
            for (let i = 0; i < this.persons.length; i++) {
                if (this.persons[i].id == managerId) {
                    ids.push(this.persons[i].managerId);
                    managerId = this.persons[i].managerId;
                }
            }
        }

        for (let i = 0; i < ids.length - 1; i++) {
            for (let j = i + 1; j < ids.length; j++) {
                if (ids[i] == ids[j]) return false;
            }
        }
        return true;
    }

    //Осуществляет общую валидацию записи
    private AllValidationCheck(person: Person): boolean {
        if (this.ValidationCheckCircles(person)) {
            return true
        }
        else {
            alert("Обнаружено замыкание цепи начальства, расставьте начальство нормально");
            return false;
        }
    }

    //Возвращает руководителя по его имени
    GetManagerByName(managerName: string): Person {
        let manager: Person;
        for (let i = 0; i < this.persons.length; i++) {
            if (this.persons[i].name == managerName) manager = this.persons[i];
        }
        return manager;
    }

    //Возвращает руководителя по его Id
    GetManagerById(managerId: number): Person {
        let manager: Person;
        for (let i = 0; i < this.persons.length; i++) {
            if (this.persons[i].id == managerId) manager = this.persons[i];
        }
        return manager;
    }

    //Возвращает список руководителей для указанного сотрудника
    GetStructedManagers(person: Person): Array<Person> {
        let managers: Array<Person> = [person];
        while (person.managerId != -1) {
            managers.push(this.GetManagerById(person.managerId));
            person = this.GetManagerById(person.managerId);
        }
        managers = managers.reverse();
        console.log(managers);
        return managers;
    }

    //Проводит проверку записи и в случае успешной проверки обновляет запись в кэше
    private ValidateAndUpdatePerson(person: Person): Person {
        person.manager = this.GetManagerById(person.managerId);
        if (this.AllValidationCheck(person)) {
            for (let i = 0; i < this.persons.length; i++) {
                if (this.persons[i].id == person.id) this.persons.splice(i, 1, person);
            }
        }
        else return null;
        return person;
    }

    //Асинхронный метод, совершающий запрос к серверу и получающий список всех сотрудников
    async GetPersons() {
        let response = await fetch('api/person/GetAllPersons');
        let result = await response;
        return await result.json();
    }

    //Асинхронный метод, совершающий запрос к серверу и отдающий запись для добавления в базу данных, а также добавляющий ее в кэш 
    async AddPerson(person: Person) {

        if (person == null) return null;
        if (this.AllValidationCheck(person)) {
            person.manager = this.GetManagerById(person.managerId);
        }
        else return null
        let response = await fetch("api/person/Add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(person)
        });
        let result = await response;
        let json = await result.json()
            .then(json => person.id = json)
            .then(() => this.persons.push(person));
        return result;
    }

    //Асинхронный метод, совершающий запрос к серверу и отдающий запись для редактирвоания в базу данных
    async UpdatePerson(person: Person) {
        person = this.ValidateAndUpdatePerson(person);
        if (person == null) return null;
        let response = await fetch("api/person/Update", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(person)
        });
        return await response;
    }

    //Асинхронный метод, совершающий запрос к серверу и отдающий запись для удаления из базы данных, а также удаляющий ее из кэша
    async DeletePerson(id: number) {
        let person = new Person();
        for (let i = 0; i < this.persons.length; i++) {
            if (this.persons[i].id == id) {
                person = this.persons[i];
                this.persons.splice(i, 1);
            }
        }
        let response = await fetch("api/person", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(person)
        });
        return response;
    }
}
