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
