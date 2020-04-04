class Person {
    id: number;
    name: string;
    employmentDate: string;
    position: string;
    order: string;
    manager: Person;
    managerId: number;
    constructor(id: number = 0, name: string = null, employmentDate: string = null, position: string = null, order: string = null, manager: Person = null, managerId: number = -1) {
        this.id = id;
        this.name = name;
        this.employmentDate = employmentDate;
        this.position = position;
        this.order = order;
        this.manager = manager;
        this.managerId = managerId;
    }
}
