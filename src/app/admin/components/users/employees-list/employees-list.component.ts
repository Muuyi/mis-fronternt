import { Component, OnInit, ViewChild } from '@angular/core';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { EmployeesService } from 'src/app/shared/employees.service';
import { NgForm } from '@angular/forms';
import { Observable,Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  // @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  constructor(private service: EmployeesService, private toastr : ToastrService ) { }

  ngOnInit() {
    this.resetForm();
    //Datatables
    this.dtOptions = {
      pagingType:'full_numbers',
      pageLength:5,
      autoWidth:true,
      order : [[0,'desc']]
    };
    this.service.getEmployee();
  }
  resetForm(form? : NgForm){
    if( form != null)
      form.resetForm();
    this.service.formData = {
      Id : null,
      FirstName:'',
      LastName:'',
      Email:'',
      Phone:null,
      DepartmentId:null,
    }
  }
  onSubmit(form: NgForm){
    this.insertRecord(form);
  }
  insertRecord(form:NgForm){
    this.service.postEmployee(form.value).subscribe(res=>{
      this.toastr.success('Record inserted successfully','Employee registration');
      this.resetForm(form);
    })
  }
}
