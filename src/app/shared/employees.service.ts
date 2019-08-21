import { Injectable } from '@angular/core';
import { Employees } from './employees.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  formData : Employees;
  employeeList : Employees[];
  readonly rootUrl = "http://localhost:5000/api";
  constructor(private http : HttpClient) { }
  //POST EMPLOYEE DATA
  postEmployee(formData: Employees){
    return this.http.post(this.rootUrl+'/employees',formData);
  }
  //GET EMPLOYEES DATA
  getEmployee(){
    return this.http.get(this.rootUrl+'/employees').toPromise().then(res=>this.employeeList = res as Employees[]);
  }
}
