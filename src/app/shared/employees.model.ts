import { Identifiers } from '@angular/compiler';

//EMPLOYEES MODEL
export class Employees {
    EmployeeId: number; 
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: number;
    DepartmentId: number;
}
//DEPARTMENTS MODEL
export class Departments{
    Id:number
    DepartmentName:string;
    CreatedDate? : Date;
}
//SYSTEM USERS MODEL
export class Administrators{
    Id: number;
    Username : string;
    Password : string;
    EmployeesId : number;
    CreatedDate : string;
}
//CUSTOMERS USERS MODEL
export class Customers{
    Id : number;
    Name : string;
    Email : string;
    Phone : number;
    Address : string;
}
//MEETINGS MODEL
export class Meetings{
    Id : number;
    Subject : string;
    Description : string;
    MeetingDate : string;
    CreatedDate : String;
}
//MEETINGS PROGRESS
export class MeetingProgress{
    Id : number;
    MeetingsId : number;
    MeetingStatus : string;
    CreatedDate : string;
}
//TASKS
export class Tasks{
    Id : number;
    TaskSubject : String;
    Description : string;
    StartDate : String;
    EndDate : String;
    EmployeesId : number;
    CreatedDate : string;
}
//TASKS PROGRESS
export class TasksProgress{
    Id : number;
    TasksId : number;
    Comments : string;
    Status : string;
    Metric : number;
    CreatedDate : Date;
}
//PROJECTS
export class Projects{
    Id : number;
    ProjectName : string;
    StartDate : string;
    EndDate : string;
    EmployeesId : number;
    CreatedDate : string;
}
//PROJECTS PROGRESS
export class ProjectsProgress{
    Id : number;
    Comments : string;
    Metric : number;
    ProjectsId : number;
    CreatedDate : Date;
}
//LEAVE MODEL
export class Leave{
    Id : number;
    ApplicationUserId : string;
    StartDate : string;
    EndDate : string;
    CreatedDate : string;
}
//LEAVE HOLDER MODEL
export class LeaveHolder{
    LeaveId : number; 
    ApplicationUserId : string;
}
//TICKETS
export class Tickets{
    Id : number;
    EmployeesId : number;
    CreatedDate : string;
}
//TICKETS PROGRESS
export class TicketsProgress{
    Id : number;
    Comments : string;
    Status : string;
    TicketsId : number;
    CreatedDate : Date;
}
//APPLICATION USER
export class ApplicationUser{
    UserName :string;
    Email : string;
    FullName : string;
    PhoneNumber : string;
    DepartmentId : number;
}


