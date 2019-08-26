import { Injectable } from '@angular/core';
import { Employees,Departments, Users,Customers, Meetings, Tasks, Projects, Leave } from './employees.model';
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
  //GET EMPLOYEE DATA
  getEmpData(index){
    return index;
  }
  //POST EMPLOYEE DATA
  postEmployee(formData: Employees){
    return this.http.post(environment.rootApi+'/employees',formData);
  }
  //GET EMPLOYEES DATA
  getEmployee(){
    return this.http.get(environment.rootApi+'/employees').toPromise();
    // .then(res=>this.employeesList = res as Employees[]);
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
//////////////////////////////////////////CUSTOMERS SERVICE//////////////////////
export class CustomersService{
  customersData : Customers;
  customersList : Customers[];
  empId : null;
  constructor (private http : HttpClient){

  }
  //GET CUSTOMERS LIST
  getCustomers(){
    return this.http.get(environment.rootApi+'/customers').toPromise().then(res=>this.customersList = res as Customers[]);
  }
  //POST CUSTOMERS
  postCustomer(formData : Customers){
    return this.http.post(environment.rootApi+'/customers',formData);
  }

}
/////////////////////////////////////////////MEETINGS SERVICE////////////////
export class MeetingsService{
  meetingsData : Meetings;
  meetingsList : Meetings[];
  constructor (private http : HttpClient){

  }
  //GET CUSTOMERS LIST
  getMeetings(){
    return this.http.get(environment.rootApi+'/meetings').toPromise().then(res=>this.meetingsList = res as Meetings[]);
  }
  //POST CUSTOMERS
  postCustomer(formData : Meetings){
    return this.http.post(environment.rootApi+'/meetings',formData);
  }

}
////////////////////////////////////////////TASKS SERVICE///////////////////////
export class TasksService{
  tasksData : Tasks;
  tasksList : Tasks[];
  constructor (private http : HttpClient){

  }
  //GET CUSTOMERS LIST
  getTasks(){
    return this.http.get(environment.rootApi+'/tasks').toPromise().then(res=>this.tasksList = res as Tasks[]);
  }
  //POST CUSTOMERS
  postTasks(formData : Tasks){
    return this.http.post(environment.rootApi+'/tasks',formData);
  }

}
///////////////////////////////////////////////PROJECTS SERVICE/////////////////////
export class ProjectsService{
  projectData : Projects;
  projectList : Projects[];
  constructor (private http : HttpClient){

  }
  //GET CUSTOMERS LIST
  getProjects(){
    return this.http.get(environment.rootApi+'/projects').toPromise().then(res=>this.projectList = res as Projects[]);
  }
  //POST CUSTOMERS
  postProject(formData : Projects){
    return this.http.post(environment.rootApi+'/projects',formData);
  }

}
//////////////////////////////////////////////LEAVE SERVICE//////////////////////////////////////////
export class LeaveService{
  leaveData : Leave;
  leaveList : Leave[];
  constructor (private http : HttpClient){

  }
  //GET CUSTOMERS LIST
  getLeave(){
    return this.http.get(environment.rootApi+'/leave').toPromise().then(res=>this.leaveList = res as Leave[]);
  }
  //POST CUSTOMERS
  postLeave(formData : Leave){
    return this.http.post(environment.rootApi+'/leave',formData);
  }

}
