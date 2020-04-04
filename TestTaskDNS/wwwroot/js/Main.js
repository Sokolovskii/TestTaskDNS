window.onload = function () {
    var display = new Display();
    var repository = new Repository();
    var body = document.getElementsByTagName("body")[0];
    var cover = document.getElementById("cover");
    repository.GetPersons()
        .then(function (result) { return repository.PushPersons(result); })
        .then(function () { return display.Render(repository); });
    var createExcelButton = document.getElementById('CreateExcelTable');
    var addButton = document.getElementById("Add");
    var updateButton = document.getElementById("Update");
    var deleteButton = document.getElementById("Delete");
    var subordinationButton = document.getElementById("Subordination");
    var closeButton = document.getElementById("closeModal");
    var sortButton = document.getElementById("sorting");
    var sort = document.getElementById("sort");
    closeButton.onclick = function () {
        display.CloseAndClearFormsInModal();
        body.style.overflowY = "visible";
        cover.className = "coverHide";
    };
    createExcelButton.onclick = function () {
        window.location.href = "api/person/excel";
    };
    addButton.onclick = function () {
        var modal = document.getElementById("modal-view");
        var addPerson = document.getElementById("submitModal");
        modal.className = "modalFormOpen";
        body.style.overflowY = "hidden";
        cover.className = "coverOpen";
        addPerson.onclick = function () {
            var person = display.CreatePersonFromModal(repository);
            repository.AddPerson(person)
                .then(function () { return display.CloseAndClearFormsInModal(); })
                .then(function () { return body.style.overflowY = "visible"; })
                .then(function () { return cover.className = "coverHide"; })
                .then(function () { return display.Render(repository); });
        };
    };
    deleteButton.onclick = function () {
        var menu = document.getElementById("menu");
        var string = document.getElementsByClassName("selectedElement")[0];
        var tags = string.getElementsByTagName("td");
        var id = +tags[5].innerHTML;
        repository.DeletePerson(id)
            .then(function () { return menu.style.display = "none"; })
            .then(function () { return display.Render(repository); });
    };
    updateButton.onclick = function () {
        var string = document.getElementsByClassName("selectedElement")[0];
        var tags = string.getElementsByTagName("td");
        var modal = document.getElementById("modal-view");
        var updateButton = document.getElementById("submitModal");
        body.style.overflowY = "hidden";
        body.style.zIndex = "1";
        cover.className = "coverOpen";
        var person = new Person();
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
            var dateArray = person.employmentDate.split('.');
            var year = +dateArray[2];
            var month = +dateArray[1];
            var day = +dateArray[0];
            var days = 31;
            if (month == 2) {
                days = ((year % 4) == 0) ? 29 : 28;
            }
            else if (month == 4 || month == 6 || month == 9 || month == 11) {
                days = 30;
            }
            if (day <= days) {
                repository.UpdatePerson(person)
                    .then(function () { return display.CloseAndClearFormsInModal(); })
                    .then(function () { return body.style.overflowY = "visible"; })
                    .then(function () { return cover.className = "coverHide"; })
                    .then(function () { return display.Render(repository); });
            }
            else {
                alert("Некорректная дата, измените данные");
            }
        };
    };
    subordinationButton.onclick = function () {
        var string = document.getElementsByClassName("selectedElement")[0];
        var tags = string.getElementsByTagName("td");
        var person = new Person();
        var closeButton = document.getElementById("closeSubordinationModal");
        var modal = document.getElementById("SubordinationModal");
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
        };
    };
    sortButton.onclick = function () {
        repository.SortTable();
        display.Render(repository);
        sort.style.display = "none";
    };
};
//# sourceMappingURL=Main.js.map