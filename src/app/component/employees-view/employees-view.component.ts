import { Component, OnInit } from '@angular/core';

interface Employee {
  name: String;
  label?: String;
  id: number;
  managerId?: number;
  children?: Employee[];
}

@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.css'],
})
export class EmployeesViewComponent implements OnInit {
  employeesList: Employee[] = [
    { name: 'Alan', id: 100, managerId: 150 },
    { name: 'Martin', id: 220, managerId: 100 },
    { name: 'Jamie', id: 150 },
    { name: 'Alex', id: 275, managerId: 100 },
    { name: 'Steve', id: 400, managerId: 150 },
    { name: 'David', id: 190, managerId: 400 },
    { name: 'Chee', id: 191, managerId: 190 },
    { name: 'Owen', id: 191, managerId: 490 },
  ];
  data: Employee[];

  constructor() {}

  ngOnInit(): void {
    const mapWithEmployees:{[key:number]:Employee} = this.employeesList.reduce(this.convert, {});
    this.data = Object.values(mapWithEmployees).filter( employee => !employee.managerId);
    this.data.forEach(employee => employee.children && employee.children.forEach(child => 
      this.populateChildren(child, mapWithEmployees)));
  }

  populateChildren(employee: Employee, mapWithEmployees: { [key: number]: Employee; }): void {
    employee.children = mapWithEmployees[employee.id].children;
    employee.children.forEach(child => this.populateChildren(child, mapWithEmployees));
  }

  convert = (map, employee:Employee) => {
//    employee.label = employee.name;//assign the label property for tree view purpose
    const managerKey = employee.managerId;
    if(managerKey){
      const manager:Employee = map[managerKey] || {id:managerKey, children: []};
      manager.children.push({...employee, label:employee.name});
      map[managerKey] =manager;
    }
    const employeeEntry:Employee = map[employee.id] || {...employee, children: []};
    employeeEntry.name = employee.name;
    employeeEntry.label = employee.name;
    map[employee.id] = employeeEntry;
    return map;
  };
}
