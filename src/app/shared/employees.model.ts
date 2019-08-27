//EMPLOYEES MODEL
export class Employees {
    Id: number; 
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
}
//SYSTEM USERS MODEL
export class Users{
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
//PROJECTS
export class Projects{
    Id : number;
    ProjectName : string;
    StartDate : string;
    EndDate : string;
    EmployeesId : number;
    CreatedDate : string;
}

//LEAVE MODEL
export class Leave{
    Id : number;
    EmployeesId : number;
    StartDate : string;
    EndDate : string;
    PlaceholderId : number;
    CreatedDate : string;
}
//TICKETS
export class Tickets{
    Id : number;
    EmployeesId : number;
    CreatedDate : string;
}

