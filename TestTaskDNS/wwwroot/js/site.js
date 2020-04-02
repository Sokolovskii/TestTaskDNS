var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Person = /** @class */ (function () {
    function Person(id, name, employmentDate, position, order, manager, managerId) {
        if (id === void 0) { id = 0; }
        if (name === void 0) { name = null; }
        if (employmentDate === void 0) { employmentDate = null; }
        if (position === void 0) { position = null; }
        if (order === void 0) { order = null; }
        if (manager === void 0) { manager = null; }
        if (managerId === void 0) { managerId = -1; }
        this.id = id;
        this.name = name;
        this.employmentDate = employmentDate;
        this.position = position;
        this.order = order;
        this.manager = manager;
        this.managerId = managerId;
    }
    return Person;
}());
var Display = /** @class */ (function () {
    function Display() {
    }
    Display.prototype.RenderPersonForModal = function (repository, person) {
        document.getElementById("idModal").value = String(person.id);
        document.getElementById("nameModal").value = person.name;
        document.getElementById("positionModal").value = person.position;
        var dateArray = person.employmentDate.split('.');
        var stringDateCorrect = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
        document.getElementById("employmentDateModal").valueAsDate = new Date(stringDateCorrect);
        document.getElementById("orderModal").value = person.order;
        document.getElementById("managerNameModal").value = "";
        if (person.managerId != 0) {
            document.getElementById("managerNameModal").value = String(repository.GetManagerById(person.managerId).name);
        }
    };
    Display.prototype.CreatePersonFromModal = function (repository) {
        var person = new Person();
        person.id = +document.getElementById("idModal").value;
        person.name = document.getElementById("nameModal").value;
        person.position = document.getElementById("positionModal").value;
        var dateRow = document.getElementById("employmentDateModal").value;
        var dateArray = dateRow.split('-');
        var date = dateArray[2] + '.' + dateArray[1] + '.' + dateArray[0];
        person.employmentDate = date;
        person.order = document.getElementById("orderModal").value;
        var managerName = document.getElementById("managerNameModal").value;
        person.managerId = repository.GetManagerByName(managerName).id;
        return person;
    };
    Display.prototype.CloseAndClearFormsInModal = function () {
        document.getElementById("nameModal").value = "testname";
        document.getElementById("positionModal").value = "testpos";
        document.getElementById("employmentDateModal").value = "1234-01-01";
        document.getElementById("orderModal").value = "testorder";
        document.getElementById("managerNameModal").value = "Фулгрим";
        var modal = document.getElementById("modal-view");
        modal.className = "modalFormClose";
    };
    Display.prototype.RenderSubordinationModal = function (managers) {
        var subordinationTable = document.getElementById('SubordinationTable');
        subordinationTable.innerHTML = "";
        for (var i = 0; i < managers.length; i++) {
            var string = document.createElement('tr');
            if (i != managers.length - 1) {
                string.innerHTML = ("<td style='border-color:whitesmoke; text-align:center'>"
                    + managers[i].name
                    + " (" + managers[i].position + ")</td>");
                subordinationTable.append(string);
                var stringImg = document.createElement('tr');
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
    };
    Display.prototype.Render = function (repository) {
        var table = document.getElementById('Table');
        table.innerHTML = "";
        var headerOfTable = document.createElement('tr');
        headerOfTable.innerHTML = ("<th id='nameHeader'>Имя</th>"
            + "<th id='positionHeader'>Должность</th>"
            + "<th id='employmentDateHeader'>Дата приема сотрудника</th>"
            + "<th id='orderHeader'>Отдел</th>"
            + "<th id='managerHeader'>Руководитель сотрудника</th>"
            + "<th></th>");
        table.append(headerOfTable);
        var nameHeader = document.getElementById("nameHeader");
        var positionHeader = document.getElementById("positionHeader");
        var employmentDateHeader = document.getElementById("employmentDateHeader");
        var orderHeader = document.getElementById("orderHeader");
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
        var _loop_1 = function (i) {
            var managerName = "";
            if (repository.persons[i].manager != null) {
                managerName = repository.persons[i].manager.name;
            }
            var string = document.createElement('tr');
            string.onclick = function () {
                var str = document.getElementsByClassName("selectedElement");
                var menu = document.getElementById("menu");
                var sort = document.getElementById("sort");
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
            };
            string.innerHTML = ("<td>" + repository.persons[i].name + "</td>"
                + "<td>" + repository.persons[i].position + "</td>"
                + "<td>" + repository.persons[i].employmentDate + "</td>"
                + "<td>" + repository.persons[i].order + "</td>"
                + "<td>" + managerName + "</td>"
                + "<td style='visibility:hidden'>" + repository.persons[i].id + "</td>");
            table.append(string);
        };
        for (var i = 0; i < repository.persons.length; i++) {
            _loop_1(i);
        }
    };
    return Display;
}());
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
var Repository = /** @class */ (function () {
    function Repository() {
        this.persons = [];
    }
    Repository.prototype.SortTable = function () {
        var element = document.getElementsByClassName("selectedElement")[0];
        var criterion = "";
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
    };
    Repository.prototype.ByField = function (field) {
        return function (a, b) { return a[field] > b[field] ? 1 : -1; };
    };
    Repository.prototype.PushPersons = function (personsJson) {
        var length = Object.keys(personsJson).length;
        for (var i = 0; i < length; i++) {
            this.persons.push(personsJson[i]);
        }
        return personsJson;
    };
    Repository.prototype.ValidationCheckCircles = function (person) {
        var managerId = person.managerId;
        var ids = [person.id, managerId];
        while (managerId != -1) {
            for (var i = 0; i < this.persons.length; i++) {
                if (this.persons[i].id == managerId) {
                    ids.push(this.persons[i].managerId);
                    managerId = this.persons[i].managerId;
                }
            }
        }
        for (var i = 0; i < ids.length - 1; i++) {
            for (var j = i + 1; j < ids.length; j++) {
                if (ids[i] == ids[j])
                    return false;
            }
        }
        return true;
    };
    Repository.prototype.AllValidationCheck = function (person) {
        if (this.ValidationCheckCircles(person)) {
            return true;
        }
        else {
            alert("Обнаружено замыкание цепи начальства, расставьте начальство нормально");
            return false;
        }
    };
    Repository.prototype.GetManagerByName = function (managerName) {
        var manager;
        for (var i = 0; i < this.persons.length; i++) {
            if (this.persons[i].name == managerName)
                manager = this.persons[i];
        }
        return manager;
    };
    Repository.prototype.GetManagerById = function (managerId) {
        var manager;
        for (var i = 0; i < this.persons.length; i++) {
            if (this.persons[i].id == managerId)
                manager = this.persons[i];
        }
        return manager;
    };
    Repository.prototype.GetStructedManagers = function (person) {
        var managers = [person];
        while (person.managerId != -1) {
            managers.push(this.GetManagerById(person.managerId));
            person = this.GetManagerById(person.managerId);
        }
        managers = managers.reverse();
        console.log(managers);
        return managers;
    };
    Repository.prototype.ValidateAndUpdatePerson = function (person) {
        person.manager = this.GetManagerById(person.managerId);
        if (this.AllValidationCheck(person)) {
            for (var i = 0; i < this.persons.length; i++) {
                if (this.persons[i].id == person.id)
                    this.persons.splice(i, 1, person);
            }
        }
        else
            return null;
        return person;
    };
    Repository.prototype.GetPersons = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('api/person/GetAllPersons')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Repository.prototype.AddPerson = function (person) {
        return __awaiter(this, void 0, void 0, function () {
            var response, result, json;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (person == null)
                            return [2 /*return*/, null];
                        if (this.AllValidationCheck(person)) {
                            person.manager = this.GetManagerById(person.managerId);
                        }
                        else
                            return [2 /*return*/, null];
                        return [4 /*yield*/, fetch("api/person/Add", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json; charset=utf-8',
                                },
                                body: JSON.stringify(person)
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()
                                .then(function (json) { return person.id = json; })
                                .then(function () { return _this.persons.push(person); })];
                    case 3:
                        json = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Repository.prototype.UpdatePerson = function (person) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        person = this.ValidateAndUpdatePerson(person);
                        if (person == null)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, fetch("api/person/Update", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json; charset=utf-8',
                                },
                                body: JSON.stringify(person)
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Repository.prototype.DeletePerson = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var person, i, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        person = new Person();
                        for (i = 0; i < this.persons.length; i++) {
                            if (this.persons[i].id == id) {
                                person = this.persons[i];
                                this.persons.splice(i, 1);
                            }
                        }
                        return [4 /*yield*/, fetch("api/person", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json; charset=utf-8',
                                },
                                body: JSON.stringify(person)
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return Repository;
}());
function ElementHighlightning(element) {
    var str = document.getElementsByClassName("selectedElement");
    var sort = document.getElementById("sort");
    var menu = document.getElementById("menu");
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
//# sourceMappingURL=site.js.map