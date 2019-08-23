import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UsersService, EmployeesService } from 'src/app/shared/employees.service';
import { Users } from 'src/app/shared/employees.model';

@Component({
  selector: 'app-system-users',
  templateUrl: './system-users.component.html',
  styleUrls: ['./system-users.component.scss']
})
export class SystemUsersComponent implements OnInit {
  user : Users;
  constructor(private usersService : UsersService,private employeesService : EmployeesService,private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    //Get employees list
    this.employeesService.getEmployee();
    //GET USERS LIST
    this.usersService.getUsers();
  }
  //RESET FORM
  resetForm(form? : NgForm){
    if(form != null)
    form.reset();
    this.user = {
      Id:0,
      Username:'',
      Password:'',
      EmployeesId:0,
      CreatedDate:null
    }
  }
  //SUBMIT FORM
  onSubmit(form : NgForm){
    this.insertRecord(form);
  }
  //INSERT RECORD
  insertRecord(form : NgForm){
    this.usersService.postUsers(form.value).subscribe(res => { 
      this.toastr.success('Record inserted successfully','User Registration');
      this.resetForm(form);
    })
  }
}
