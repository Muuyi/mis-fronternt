import { Injectable } from '@angular/core';
import { Employees,Departments, Users } from './employees.model';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

/////////////////////////////////////////////EMPLOYEES SERVICE///////////////////////
export class EmployeesService {
  formData : Employees;
  employeesList : Employees[];
  constructor(private http : HttpClient) { 

  }
  //POST EMPLOYEE DATA
  postEmployee(formData: Employees){
    return this.http.post(environment.rootApi+'/employees',formData);
  }
  //GET EMPLOYEES DATA
  getEmployee(){
    return this.http.get(environment.rootApi+'/employees').toPromise().then(res=>this.employeesList = res as Employees[]);
  }
}
/////////////////////////////////////////////DEPARTMENTS SERVICE////////////////////////
export class DepartmentsService{
  departmentsData: Departments;
  departmentsList : Departments[];
  constructor(private http : HttpClient) { 

  }
  //GET DEPARTMENTS
  getDepartments(){
    return this.http.get(environment.rootApi+'/departments').toPromise().then(res=>this.departmentsList = res as Departments[]);
    // .then(res=>this.departmentsList = res as Departments[]);
  }

}
////////////////////////////////////////////////USERS SERVICE//////////////////////////
export class UsersService{
  usersForm : Users;
  usersList : Users[]
  constructor(private http : HttpClient){

  }
  //GET USERS LIST
  getUsers(){
    return this.http.get(environment.rootApi+'/users').toPromise().then(res=>this.usersList = res as Users[]);
  }
  //POST USERS
  postUsers(formData : Users){
    return this.http.post(environment.rootApi+'/users',formData);
  }
}
