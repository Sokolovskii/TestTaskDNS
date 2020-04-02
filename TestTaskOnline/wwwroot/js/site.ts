class Person {
    id: number;
    name: string;
    employmentDate: string;
    position: string;
    order: string;
    manager: Person;
    managerId: number;
    constructor(id: number = 0, name: string = null, employmentDate: string=null, position: string=null, order: string=null, manager: Person=null, managerId:number = -1) {
        this.id = id;
        this.name = name;
        this.employmentDate = employmentDate;
        this.position = position;
        this.order = order;
        this.manager = manager;
        this.managerId = managerId;
    }
}

class Display {

    RenderPersonForModal(repository: Repository, person: Person) {
        (<HTMLInputElement>document.getElementById("idModal")).value = String(person.id);
        (<HTMLInputElement>document.getElementById("nameModal")).value = person.name;
        (<HTMLInputElement>document.getElementById("positionModal")).value = person.position;
        let dateArray = person.employmentDate.split('.');
        let stringDateCorrect = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
        (<HTMLInputElement>document.getElementById("employmentDateModal")).valueAsDate = new Date(stringDateCorrect);
        (<HTMLInputElement>document.getElementById("orderModal")).value = person.order;
        (<HTMLInputElement>document.getElementById("managerNameModal")).value = "";
        if (person.managerId != 0) {
            (<HTMLInputElement>document.getElementById("managerNameModal")).value = String(repository.GetManagerById(person.managerId).name);
        }
        
    }

    CreatePersonFromModal(repository: Repository): Person {
        let person = new Person();
        person.id = +(<HTMLInputElement>document.getElementById("idModal")).value;
        person.name = (<HTMLInputElement>document.getElementById("nameModal")).value;
        person.position = (<HTMLInputElement>document.getElementById("positionModal")).value;
        let dateRow = (<HTMLInputElement>document.getElementById("employmentDateModal")).value;
        let dateArray = dateRow.split('-');
        let date = dateArray[2] + '.' + dateArray[1] + '.' + dateArray[0];
        person.employmentDate = date;
        person.order = (<HTMLInputElement>document.getElementById("orderModal")).value;
        let managerName = (<HTMLInputElement>document.getElementById("managerNameModal")).value;
        person.managerId = repository.GetManagerByName(managerName).id;
        return person;
    }

    CloseAndClearFormsInModal() {
        (<HTMLInputElement>document.getElementById("nameModal")).value = "testname";
        (<HTMLInputElement>document.getElementById("positionModal")).value = "testpos";
        (<HTMLInputElement>document.getElementById("employmentDateModal")).value = "1234-01-01";
        (<HTMLInputElement>document.getElementById("orderModal")).value = "testorder";
        (<HTMLInputElement>document.getElementById("managerNameModal")).value = "Фулгрим";
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

    Render(repository:Repository) {

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
}

window.onload = function () {
    let display: Display = new Display();
    var repository: Repository = new Repository(); 
    let body = document.getElementsByTagName("body")[0];
    let cover = document.getElementById("cover");

    repository.GetPersons()
        .then(result => repository.PushPersons(result))
        .then(()=>display.Render(repository));

    let createExcelButton = document.getElementById('CreateExcelTable');
    let addButton = document.getElementById("Add");
    let updateButton = document.getElementById("Update");
    let deleteButton = document.getElementById("Delete");
    let subordinationButton = document.getElementById("Subordination");
    let closeButton = document.getElementById("closeModal");
    let sortButton = document.getElementById("sorting");
    let sort = document.getElementById("sort");

    closeButton.onclick = function(){
        display.CloseAndClearFormsInModal();
        body.style.overflowY = "visible";
        cover.className = "coverHide";
    }
    createExcelButton.onclick = function () {
        window.location.href = "api/person/excel";
    }
    addButton.onclick = function () {
        let modal = document.getElementById("modal-view");
        let addPerson = document.getElementById("submitModal");
        modal.className = "modalFormOpen";
        body.style.overflowY = "hidden";
        cover.className = "coverOpen";
        addPerson.onclick = function () {
            let person = display.CreatePersonFromModal(repository);           
            repository.AddPerson(person)
                .then(() => display.CloseAndClearFormsInModal())
                .then(() => body.style.overflowY = "visible")
                .then(() => cover.className = "coverHide")
                .then(() => display.Render(repository));
        }
    }
    deleteButton.onclick = function () {
        let menu = document.getElementById("menu");
        let string = document.getElementsByClassName("selectedElement")[0];
        let tags = string.getElementsByTagName("td");
        let id = +tags[5].innerHTML;
        repository.DeletePerson(id)
            .then(() => menu.style.display = "none")
            .then(() => display.Render(repository));
    }
    updateButton.onclick = function () {
        let string = document.getElementsByClassName("selectedElement")[0];
        let tags = string.getElementsByTagName("td");
        let modal = document.getElementById("modal-view");
        let updateButton = document.getElementById("submitModal");
        body.style.overflowY = "hidden";
        body.style.zIndex = "1";
        cover.className = "coverOpen";
        let person = new Person();
        person.name = tags[0].innerHTML;
        person.position = tags[1].innerHTML;
        person.employmentDate = tags[2].innerHTML;
        person.order = tags[3].innerHTML;
        person.id = +tags[5].innerHTML;
        person.managerId = 0;
        if (tags[4].innerHTML != "") {
            person.managerId = repository.GetManagerByName(tags[4].innerHTML).id;
        }
        modal.className = "modalFormOpen";
        display.RenderPersonForModal(repository, person);
        
        updateButton.onclick = function () {
            person = display.CreatePersonFromModal(repository);
            let dateArray = person.employmentDate.split('.');
            let year = +dateArray[2];
            let month = +dateArray[1];
            let day = +dateArray[0];
            let days = 31;
            if (month == 2) {
                days = ((year % 4) == 0) ? 29 : 28;
            }
            else if (month == 4 || month == 6 || month == 9 || month == 11) {
                days = 30;
            }
            if (day <= days) {
                repository.UpdatePerson(person)
                    .then(() => display.CloseAndClearFormsInModal())
                    .then(() => body.style.overflowY = "visible")
                    .then(() => cover.className = "coverHide")
                    .then(() => display.Render(repository));
            }
            else {
                alert("Некорректная дата, измените данные");
            }
           
        } 
    }  
    subordinationButton.onclick = function () {
        let string = document.getElementsByClassName("selectedElement")[0];
        let tags = string.getElementsByTagName("td");
        let person = new Person();
        let closeButton = document.getElementById("closeSubordinationModal");
        let modal = document.getElementById("SubordinationModal");
        body.style.zIndex = "1";
        cover.className = "coverOpen";
        person.name = tags[0].innerHTML;
        person.position = tags[1].innerHTML;
        person.employmentDate = tags[2].innerHTML;
        person.order = tags[3].innerHTML;
        person.id = +tags[5].innerHTML;
        person.managerId = repository.GetManagerByName(tags[4].innerHTML).id;

        modal.className = "modalSubordinationOpen";
        display.RenderSubordinationModal(repository.GetStructedManagers(person));
        

        closeButton.onclick = function () {
            body.style.overflowY = "visible";
            cover.className = "coverHide";
            modal.className = "modalSubordinationClose";
        }
    }
    sortButton.onclick = function () {
        repository.SortTable();
        display.Render(repository);
        sort.style.display = "none";
    }
}

class Repository {

    persons: Array<Person> = [];

    SortTable() {
        let element = document.getElementsByClassName("selectedElement")[0];
        let criterion = "";
        if (element.innerHTML == "Имя") {
            criterion = "name";
        }
        if (element.innerHTML == "Должность") {
            criterion = "position";
        }
        if (element.innerHTML == "Отдел") {
            criterion = "order";
        }
        if (element.innerHTML == "Дата приема сотрудника") {
            criterion = "employmentDate";
        }
        this.persons.sort(this.ByField(criterion));
    }

    ByField(field) {
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }

    PushPersons(personsJson: JSON):JSON {
        let length: number = Object.keys(personsJson).length;
        for (let i = 0; i < length; i++) {
            this.persons.push(personsJson[i]);
        }
        return personsJson
    }

    ValidationCheckCircles(person: Person): boolean {
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

        for (let i = 0; i < ids.length-1; i++) {
            for (let j = i+1; j < ids.length; j++) {
                if (ids[i] == ids[j]) return false;
            }
        }
        return true;
    }

    AllValidationCheck(person: Person): boolean {
        if (this.ValidationCheckCircles(person)) {
            return true
        }
        else {
            alert("Обнаружено замыкание цепи начальства, расставьте начальство нормально");
            return false;
        }
    }

    GetManagerByName(managerName:string): Person {
        let manager: Person;
        for (let i = 0; i < this.persons.length; i++) {
            if (this.persons[i].name == managerName) manager = this.persons[i];
        }
        return manager;
    }

    GetManagerById(managerId:number):Person {
        let manager: Person;
        for (let i = 0; i < this.persons.length; i++) {
            if (this.persons[i].id == managerId) manager = this.persons[i];
        }
        return manager;
    }

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

    ValidateAndUpdatePerson(person: Person): Person {
        person.manager = this.GetManagerById(person.managerId);
        if (this.AllValidationCheck(person)) {
            for (let i = 0; i < this.persons.length; i++) {
                if (this.persons[i].id == person.id) this.persons.splice(i,1,person);
            }
        }
        else return null;
        return person;
    }

    async GetPersons() {
        let response = await fetch('api/person/GetAllPersons');
        let result = await response;
        return await result.json();
    }

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