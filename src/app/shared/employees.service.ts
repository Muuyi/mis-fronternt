import { Injectable } from '@angular/core';
import { Employees,Departments,Customers, Meetings, Tasks, Projects, Leave, Tickets, Administrators, TasksProgress, ProjectsProgress, LeaveHolder, ApplicationUser, MeetingProgress } from './employees.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
  //POST EMPLOYEE DATA
  postEmployee(formData: Employees){
    return this.http.post(environment.rootApi+'/employees',formData);
  }
  //GET EMPLOYEES DATA
  getEmployee(){
    return this.http.get(environment.rootApi+'/employees').toPromise().then(res=>this.employeesList = res as Employees[]);
  }
  //DELETE EMPLOYEES DATA
  deleteEmployee(id:number){
    return this.http.delete(environment.rootApi+'/employees/'+id);
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
  }
  //DELETE USERS DATA
  deleteDepartments(id:number){
    return this.http.delete(environment.rootApi+'/departments/'+id);
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
  //DELETE USERS DATA
  deleteUsers(id:number){
    return this.http.delete(environment.rootApi+'/administrators/'+id);
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
  // postCustomer(formData : Customers){
  //   return this.http.post(environment.rootApi+'/customers',formData);
  // }
  //DELETE CUSTOMERS DATA
  deleteCustomers(id:number){
    return this.http.delete(environment.rootApi+'/customers/'+id);
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
  // postCustomer(formData : Meetings){
  //   return this.http.post(environment.rootApi+'/meetings',formData);
  // }
  //DELETE MEETINGS
  deleteMeeting(id:number){
    return this.http.delete(environment.rootApi+'/meetings/'+id);
  }
}
/////////////////////////////////////////////MEETINGS ATTENDANCE////////////////////
export class MeetingsAttendanceService{
  constructor (private http : HttpClient){
    
  }
}
//////////////////////////////////////////////MEETING PROGESS SERVICE//////////////
export class MeetingProgressService{
  meetingProgressList : MeetingProgress[];
  constructor (private http : HttpClient){

  }
  //GET MEETINGS PROGRESSS
  getMeetingProgress(){
    return this.http.get(environment.rootApi+'/meetingProgress').toPromise().then(res=>this.meetingProgressList = res as MeetingProgress[]);
  }
  //DELETE MEETINGS PROGRESS
  deleteMeetingProgress(id:number){
    return this.http.delete(environment.rootApi+'/meetingProgress/'+id);
  }
}
////////////////////////////////////////////TASKS SERVICE///////////////////////
export class TasksService{
  tasksData : Tasks;
  tasksList : Tasks[];
  constructor (private http : HttpClient){

  }
  //GET TASKS LIST
  getTasks(){
    return this.http.get(environment.rootApi+'/tasks').toPromise().then(res=>this.tasksList = res as Tasks[]);
  }
  //POST TASKS LISTS
  // postTasks(formData : Tasks){
  //   return this.http.post(environment.rootApi+'/tasks',formData);
  // }
  //DELETE TASKS
  deleteTask(id:number){
    return this.http.delete(environment.rootApi+'/tasks/'+id);
  }
}
//////////////////////////////////////////TASKS PROGRESS SERVICE///////////////////////////////
export class TasksProgressService {
  tasksProgressList : TasksProgress[];
  constructor(private http : HttpClient) { 

  }
  //POST EMPLOYEE DATA
  postTasksProgress(formData: TasksProgress){
    return this.http.post(environment.rootApi+'/tasksProgress',formData);
  }
  //GET EMPLOYEES DATA
  getTasksProgress(){
    return this.http.get(environment.rootApi+'/tasksProgress').toPromise().then(res=>this.tasksProgressList = res as TasksProgress[]);
  }
  //DELETE EMPLOYEES DATA
  deleteTasksProgress(id:number){
    return this.http.delete(environment.rootApi+'/tasksProgress/'+id);
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
    return this.http.get(environment.rootApi+'/projects').toPromise().then(res=>this.projectsList = res as Projects[]);
  }
  //POST CUSTOMERS
  // postProject(formData : Projects){
  //   return this.http.post(environment.rootApi+'/projects',formData);
  // }
  //DELETE PROJECTS
  deleteProject(id:number){
    return this.http.delete(environment.rootApi+'/projects/'+id);
  }
}
//////////////////////////////////////////////PROJECTS PROGRESS SERVICE/////////////////////////////
export class ProjectsProgressService {
  projectsProgressList : ProjectsProgress[];
  constructor(private http : HttpClient) { 

  }
  //POST DATA
  // postProjectsProgress(formData: ProjectsProgress){
  //   return this.http.post(environment.rootApi+'/projectsProgress',formData);
  // }
  //GET DATA
  getProjectsProgress(){
    return this.http.get(environment.rootApi+'/projectsProgress').toPromise().then(res=>this.projectsProgressList = res as ProjectsProgress[]);
  }
  //DELETE DATA
  deleteProjectsProgress(id:number){
    return this.http.delete(environment.rootApi+'/projectsProgress/'+id);
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
  // postLeave(formData : Leave){
  //   return this.http.post(environment.rootApi+'/leave',formData);
  // }
   //DELETE LEAVE
   deleteLeave(id:number){
    return this.http.delete(environment.rootApi+'/leave/'+id);
  }
}
///////////////////////////////////////////LEAVEHOLDERS SERVICE//////////////////////////////////
export class LeaveHolderService{
  leaveHolderList : LeaveHolder[];
  constructor (private http : HttpClient){

  }
  //GET CUSTOMERS LIST
  getLeaveHolder(){
    return this.http.get(environment.rootApi+'/leaveHolder').toPromise().then(res=>this.leaveHolderList = res as LeaveHolder[]);
  }
  //POST CUSTOMERS
  // postLeave(formData : Leave){
  //   return this.http.post(environment.rootApi+'/leave',formData);
  // }
   //DELETE LEAVE
   deleteHolderLeave(id:number){
    return this.http.delete(environment.rootApi+'/leaveHolder/'+id);
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
  // postTicket(formData : Tickets){
  //   return this.http.post(environment.rootApi+'/tickets',formData);
  // }
   //DELETE TICKETS
   deleteTicket(id:number){
    return this.http.delete(environment.rootApi+'/tickets/'+id);
  }
}
////////////////////////////////////////////////TICKETS PROGRESS ///////////////////////////////
export class TicketsProgressService{
  ticketsProgressList : Tickets[];
  constructor (private http : HttpClient){

  }
  //GET DATA LIST
  getTicketsProgress(){
    return this.http.get(environment.rootApi+'/ticketsProgress').toPromise().then(res=>this.ticketsProgressList = res as Tickets[]);
  }
  //POST DATA
  // postTicketProgress(formData : Tickets){
  //   return this.http.post(environment.rootApi+'/ticketsProgress',formData);
  // }
   //DELETE DATA
   deleteTicketProgress(id:number){
    return this.http.delete(environment.rootApi+'/ticketsProgress/'+id);
  }
}
///////////////////////////////////////////APPLICATION USER SERVICE///////////////////////////
export class ApplicationUserService{
  userList : ApplicationUser[];
  constructor (private fb: FormBuilder,private http : HttpClient){

  }
  //Form models
  formModel = this.fb.group({
    UserName :['',Validators.required],
    Email : ['',Validators.email],
    FullName : [''],
    PhoneNumber : [''],
    DepartmentId : [''],
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
      PhoneNumber : this.formModel.value.PhoneNumber,
      DepartmentId : this.formModel.value.DepartmentId,
      Password : this.formModel.value.Passwords.Password,
    }
    console.log(body);
    return this.http.post(environment.rootApi+'/ApplicationUser/Register',body);
  }
  //LOGIN FORM DATA
  login(formData){
    return this.http.post(environment.rootApi+'/ApplicationUser/Login',formData);
  }
  //DELETE EMPLOYEES
  getUsers(){
    // var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
    return this.http.get(environment.rootApi+'/applicationUser').toPromise().then(res=>this.userList = res as ApplicationUser[]);
    // .then(res=>this.ticketsProgressList = res as Tickets[]);
  }
  //GET USER DATA
  getUserProfile(){
    // var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
    return this.http.get(environment.rootApi+'/UserProfile')
  }
}

