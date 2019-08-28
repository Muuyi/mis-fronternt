import { Component, OnInit } from '@angular/core';
import { LeaveService, EmployeesService } from 'src/app/shared/employees.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Leave } from 'src/app/shared/employees.model';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  leave : Leave;

  constructor(private leaveService : LeaveService,private employeesService : EmployeesService,private toastr : ToastrService) { }

  ngOnInit() {
    this.leaveService.getLeave();
  }
  //RESET FORM
  resetForm(form? : NgForm){
    if(form != null)
      form.reset();
      this.leaveService.leaveData = {
        Id:null,
        EmployeesId : null,
        StartDate : '',
        EndDate : '',
        CreatedDate : '',
        PlaceholderId : null
      }
  }
  //SUBMIT FORM
  onSubmit(form : NgForm){
    this.insertRecord(form);
    console.log(form);
  }
  //INSERT RECORD
  insertRecord(form : NgForm){
    this.leaveService.postLeave(form.value).subscribe(res => { 
      this.toastr.success('Record inserted successfully','Leave Record');
      this.resetForm(form);
    })
  }

}