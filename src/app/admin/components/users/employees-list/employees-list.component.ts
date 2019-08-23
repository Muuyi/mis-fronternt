import { Component, OnInit, ViewChildren } from '@angular/core';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { EmployeesService, DepartmentsService } from 'src/app/shared/employees.service';
import { NgForm } from '@angular/forms';
import { Observable,Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import * as $ from 'jquery'; 

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  //DEPARTMENTS LIST
  // departmentList : Departments[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChildren(DataTableDirective) dtElement: DataTableDirective;
  constructor(private employeeService: EmployeesService,private departmentService:DepartmentsService, private toastr : ToastrService ) { }

  ngOnInit() {
    //Resetting employees form
    this.resetForm();
    //Datatables
    this.dtOptions = {
      pagingType:'full_numbers',
      pageLength:5,
      autoWidth:true,
      order : [[0,'desc']]
    };
    this.employeeService.getEmployee();
    this.dtTrigger.next();
    //Getting department list
    this.departmentService.getDepartments();
  }
  resetForm(form? : NgForm){
    if( form != null)
      form.resetForm();
    this.employeeService.formData = {
      Id : null,
      FirstName:'',
      LastName:'',
      Email:'',
      Phone:null,
      DepartmentId:0,
    }
  }
  onSubmit(form: NgForm){
    this.insertRecord(form);
  }
  insertRecord(form:NgForm){
    this.employeeService.postEmployee(form.value).subscribe(res=>{
      this.toastr.success('Record inserted successfully','Employee registration');
      this.resetForm(form);
    })
  }
}
