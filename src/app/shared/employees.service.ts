import { Injectable } from '@angular/core';
import { Employees,Departments,Customers, Meetings, Tasks, Projects, Leave, Tickets, Administrators } from './employees.model';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';

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
export class AdministratorsService{
  usersForm : Administrators;
  usersList : Administrators[]
  constructor(private http : HttpClient){

  }
  //GET USERS LIST
  getUsers(){
    return this.http.get(environment.rootApi+'/administrators').toPromise().then(res=>this.usersList = res as Administrators[]);
  }
  //POST USERS
  postUsers(formData : Administrators){
    return this.http.post(environment.rootApi+'/administrators',formData);
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
  projectsList : Projects[];
  constructor (private http : HttpClient){

  }
  //GET CUSTOMERS LIST
  getProjects(){
    return this.http.get(environment.rootApi+'/projects')
    // .toPromise().then(res=>this.projectsList = res as Projects[]);
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
/////////////////////////////////////////////TICKETS SERVICE/////////////////////////////////////
export class TicketsService{
  ticketsData : Tickets;
  ticketsList : Tickets[];
  constructor (private http : HttpClient){

  }
  //GET CUSTOMERS LIST
  getTickets(){
    return this.http.get(environment.rootApi+'/tickets').toPromise().then(res=>this.ticketsList = res as Tickets[]);
  }
  //POST CUSTOMERS
  postTicket(formData : Tickets){
    return this.http.post(environment.rootApi+'/tickets',formData);
  }
}
///////////////////////////////////////////APPLICATION USER SERVICE///////////////////////////
export class ApplicationUserService{
  constructor (private fb: FormBuilder,private http : HttpClient){

  }
  //Form models
  formModel = this.fb.group({
    UserName :['',Validators.required],
    Email : ['',Validators.email],
    FullName : [''],
    Passwords : this.fb.group({
      Password : ['',[Validators.required,Validators.minLength(4)]],
      ConfirmPassword : ['',Validators.required]
    },{validator : this.compare_passwords})
  })
  //Compare passwords
  compare_passwords(fb:FormGroup){
    let confirmPswdCtrl = fb.get("ConfirmPassword");
    if(confirmPswdCtrl.errors == null || 'passwordMismatch' in confirmPswdCtrl.errors){
      if(fb.get("Password").value != confirmPswdCtrl.value)
        confirmPswdCtrl.setErrors({ passwordMismatch:true})
      else
        confirmPswdCtrl.setErrors(null)
    }
  }
  //POST DATA TO THE DATABASE
  register(){
    var body = {
      UserName : this.formModel.value.UserName,
      Email : this.formModel.value.Email,
      FullName : this.formModel.value.FullName,
      Password : this.formModel.value.Passwords.Password,
    }
    return this.http.post(environment.rootApi+'/ApplicationUser/Register',body);
  }
  //LOGIN FORM DATA
  login(formData){
    return this.http.post(environment.rootApi+'/ApplicationUser/Login',formData);
  }
}
