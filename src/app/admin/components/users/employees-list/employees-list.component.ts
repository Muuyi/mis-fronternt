import { Component, OnInit } from '@angular/core';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { EmployeesService } from 'src/app/shared/employees.service';
import { NgForm } from '@angular/forms';
import { empty } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  
  constructor(private service: EmployeesService, private toastr : ToastrService ) { }

  ngOnInit() {
    this.resetForm();
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
