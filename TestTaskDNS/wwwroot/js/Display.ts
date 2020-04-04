class Display {

    RenderPersonForModal(repository: Repository, person: Person) {
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
        let dateArray = person.employmentDate.split('.');
        let stringDateCorrect = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
        this.SetElementValue("employmentDateModal", stringDateCorrect);
    }

    CreatePersonFromModal(repository: Repository): Person {
        let person = new Person();
        person.id = +this.GetElementValueById("idModal");
        person.name = this.GetElementValueById("nameModal");
        person.position = this.GetElementValueById("positionModal");
        let dateRow = this.GetElementValueById("employmentDateModal");
        let dateArray = dateRow.split('-');
        let date = dateArray[2] + '.' + dateArray[1] + '.' + dateArray[0];
        person.employmentDate = date;
        person.order = this.GetElementValueById("orderModal");
        let managerName = this.GetElementValueById("managerNameModal");
        person.managerId = repository.GetManagerByName(managerName).id;
        return person;
    }

    CloseAndClearFormsInModal() {
        this.SetElementValue("nameModal", "testname");
        this.SetElementValue("positionModal", "testposition");
        this.SetElementValue("employmentDateModal", "1234-01-01");
        this.SetElementValue("orderModal", "testorder");
        this.SetElementValue("managerNameModal", "Фулгрим");
        let modal = document.getElementById("modal-view");
        modal.className = "modalFormClose";
    }

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
        let positionHeader = document.getElementById("positionHeader");
        let employmentDateHeader = document.getElementById("employmentDateHeader");
        let orderHeader = document.getElementById("orderHeader");

        nameHeader.onclick = function () {
            ElementHighlightning(nameHeader);
        };

        positionHeader.onclick = function () {
            ElementHighlightning(positionHeader);
        };

        employmentDateHeader.onclick = function () {
            ElementHighlightning(employmentDateHeader);
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
                + "<td>" + repository.persons[i].employmentDate + "</td>"
                + "<td>" + repository.persons[i].order + "</td>"
                + "<td>" + managerName + "</td>"
                + "<td style='visibility:hidden'>" + repository.persons[i].id + "</td>");
            table.append(string);
        }
    }

    SetElementValue(id: string, value: string) {
        (<HTMLInputElement>document.getElementById(id)).value = value;
    }

    GetElementValueById(id: string): string {
        return (<HTMLInputElement>document.getElementById(id)).value;
    }
}

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