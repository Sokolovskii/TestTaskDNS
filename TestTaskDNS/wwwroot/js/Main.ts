window.onload = function () {
    let display: Display = new Display();
    var repository: Repository = new Repository();
    let body = document.getElementsByTagName("body")[0];
    let cover = document.getElementById("cover");

    repository.GetPersons()
        .then(result => repository.PushPersons(result))
        .then(() => display.Render(repository));

    let createExcelButton = document.getElementById('CreateExcelTable');
    let addButton = document.getElementById("Add");
    let updateButton = document.getElementById("Update");
    let deleteButton = document.getElementById("Delete");
    let subordinationButton = document.getElementById("Subordination");
    let closeButton = document.getElementById("closeModal");
    let sortUpButton = document.getElementById("sortingUp");
    let sortDownButton = document.getElementById("sortingDown");
    let sort = document.getElementById("sort");

    closeButton.onclick = function () {
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
    sortUpButton.onclick = function () {
        repository.SortTableUp();
        display.Render(repository);
        sort.style.display = "none";
    }
    sortDownButton.onclick = function () {
        repository.SortTableDown();
        display.Render(repository);
        sort.style.display = "none";
    }
}
