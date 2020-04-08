class Display {
    //Вносит данные из записи таблицы в инпуты модального окна
    public RenderPersonForModal(repository: Repository, person: Person) {
        this.SetElementValue("idModal", String(person.id));
        this.SetElementValue("nameModal", person.name);
        this.SetElementValue("positionModal", person.position);
        this.SetElementValue("orderModal", person.order);
        if (person.managerId != 0) {
            this.SetElementValue("managerNameModal", String(repository.GetManagerById(person.managerId).name));
        }
        else {
            this.SetElementValue("managerNameModal", "");
        }
        let stringDateCorrect = this.ChangeDataToModal(person.employmentDate)
        this.SetElementValue("employmentDateModal", stringDateCorrect);
    }

    //Создает экземпляр класса Person из инпутов модального окна
    public CreatePersonFromModal(repository: Repository): Person {
        let person = new Person();
        person.id = +this.GetElementValueById("idModal");
        person.name = this.GetElementValueById("nameModal");
        person.position = this.GetElementValueById("positionModal");
        let dateRow = this.GetElementValueById("employmentDateModal");
        person.employmentDate = this.ChangeDataToClient(dateRow);
        person.order = this.GetElementValueById("orderModal");
        let managerName = this.GetElementValueById("managerNameModal");
        person.managerId = repository.GetManagerByName(managerName).id;
        return person;
    }

    //Очищает инпуты модального окна и закрывает его
    public CloseAndClearFormsInModal() {
        this.SetElementValue("nameModal", "");
        this.SetElementValue("positionModal", "");
        this.SetElementValue("employmentDateModal", "");
        this.SetElementValue("orderModal", "");
        this.SetElementValue("managerNameModal", "");
        let modal = document.getElementById("modal-view");
        modal.className = "modalFormClose";
    }

    //Формирует структуру подчиненности для модального окна
    RenderSubordinationModal(managers: Array<Person>) {
        let subordinationTable = document.getElementById('SubordinationTable');
        subordinationTable.innerHTML = "";
        for (let i = 0; i < managers.length; i++) {
            let string = document.createElement('tr');
            if (i != managers.length - 1) {
                string.innerHTML = ("<td style='border-color:whitesmoke; text-align:center'>"
                    + managers[i].name
                    + " (" + managers[i].position + ")</td>");
                subordinationTable.append(string);
                let stringImg = document.createElement('tr');
                stringImg.innerHTML = ("<td style=' background-color: whitesmoke; border-color: whitesmoke; text-align: center'>"
                    + "<img style='width: 5%;height: 5%;' src = '/css/downarrow.png' /></td>");
                subordinationTable.append(stringImg);
            }
            else {
                string.innerHTML = ("<td style='border-color:whitesmoke; text-align:center'; font-weight:700'>"
                    + managers[i].name
                    + " (" + managers[i].position + ")</td>");
                subordinationTable.append(string);
            }
        }
    }

    //Формирует таблицу сотрудников из кэша репозитория
    Render(repository: Repository) {

        let table = document.getElementById('Table');
        table.innerHTML = "";
        let headerOfTable = document.createElement('tr');
        headerOfTable.innerHTML = ("<th id='nameHeader'>Имя</th>"
            + "<th id='positionHeader'>Должность</th>"
            + "<th id='employmentDateHeader'>Дата приема сотрудника</th>"
            + "<th id='orderHeader'>Отдел</th>"
            + "<th id='managerHeader'>Руководитель сотрудника</th>"
            + "<th></th>");
        table.append(headerOfTable);

        let nameHeader = document.getElementById("nameHeader");
        let orderHeader = document.getElementById("orderHeader");

        nameHeader.onclick = function () {
            ElementHighlightning(nameHeader);
        };

        orderHeader.onclick = function () {
            ElementHighlightning(orderHeader);
        };

        for (let i = 0; i < repository.persons.length; i++) {
            let managerName = "";
            if (repository.persons[i].manager != null) {
                managerName = repository.persons[i].manager.name;
            }
            let string = document.createElement('tr');

            string.onclick = function () {
                let str = document.getElementsByClassName("selectedElement");
                let menu = document.getElementById("menu");
                let sort = document.getElementById("sort");
                if (string.className == "selectedElement") {
                    string.removeAttribute("class");
                    menu.style.display = "none";
                }
                else if (str[0] != null) {
                    str[0].removeAttribute("class");
                    string.className = "selectedElement";
                    menu.style.display = "block";
                    sort.style.display = "none";
                }
                else {
                    string.className = "selectedElement";
                    menu.style.display = "block";
                    sort.style.display = "none";
                }

            }

            string.innerHTML = ("<td>" + repository.persons[i].name + "</td>"
                + "<td>" + repository.persons[i].position + "</td>"
                + "<td style='text-align:center'>" + repository.persons[i].employmentDate + "</td>"
                + "<td>" + repository.persons[i].order + "</td>"
                + "<td>" + managerName + "</td>"
                + "<td style='visibility:hidden'>" + repository.persons[i].id + "</td>");
            table.append(string);
        }
    }

    //Устанавливает значение для элемента по Id
    private SetElementValue(id: string, value: string) {
        (<HTMLInputElement>document.getElementById(id)).value = value;
    }

    //Извлекает значение элемента по Id
    private GetElementValueById(id: string): string {
        return (<HTMLInputElement>document.getElementById(id)).value;
    }

    //Сортирует таблицу по возрастанию
    SortTableUp(repository: Repository) {
        let element = document.getElementsByClassName("selectedElement")[0];
        let criterion = "";
        if (element.innerHTML == "Имя") {
            criterion = "name";
        }
        if (element.innerHTML == "Отдел") {
            criterion = "order";
        }
        repository.persons.sort(repository.ByFieldUp(criterion));
    }

    //Сортирует таблицу по убыванию
    SortTableDown(repository: Repository) {
        let element = document.getElementsByClassName("selectedElement")[0];
        let criterion = "";
        if (element.innerHTML == "Имя") {
            criterion = "name";
        }
        if (element.innerHTML == "Отдел") {
            criterion = "order";
        }
        repository.persons.sort(repository.ByFieldDown(criterion));
    }

    //Преобразует дату из формата ГГГГ-ММ-ДД в ДД.ММ.ГГГГ для более лучшего восприятия пользователем
    private ChangeDataToClient(date:string):string{
        let dateArray = date.split('-');
        return dateArray[2] + '.' + dateArray[1] + '.' + dateArray[0];
    }

    //Преобразует дату из формата ДД.ММ.ГГГГ в ГГГГ-ДД-ММ для использования в инпутах HTML и передаче на сервер
    private ChangeDataToModal(date: string): string {
        let dateArray = date.split('.');
        return dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
    }
}

//Выделяет элемент и дает ему класс selectedElement
function ElementHighlightning(element: HTMLElement) {
    let str = document.getElementsByClassName("selectedElement");
    let sort = document.getElementById("sort");
    let menu = document.getElementById("menu");
    if (element.className == "selectedElement") {
        element.removeAttribute("class");
        sort.style.display = "none";
    }
    else if (str[0] != null) {
        str[0].removeAttribute("class");
        element.className = "selectedElement";
        sort.style.display = "block";
        menu.style.display = "none";
    }
    else {
        element.className = "selectedElement";
        sort.style.display = "block";
        menu.style.display = "none";
    }
}