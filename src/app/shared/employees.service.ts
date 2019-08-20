import { Injectable } from '@angular/core';
import { Employees } from './employees.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  formData : Employees;
  readonly rootUrl = "http://localhost:5000/api";
  constructor(private http : HttpClient) { }
  postEmployee(formData: Employees){
    return this.http.post(this.rootUrl+'/employes',formData);
  }
}
