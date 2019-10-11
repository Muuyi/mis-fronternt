import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ApplicationUserService, DepartmentsService } from 'src/app/shared/employees.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  userDetails;
  constructor(private usersService : ApplicationUserService,private departmentService : DepartmentsService,private fb:FormBuilder ) { }
  profileForm = this.fb.group({
    FullName :[''],
    UserName : [''],
    Email : [''],
    PhoneNumber: [''],
    DepartmentId:['']
  })
  imageForm = this.fb.group({
    Id:[''],
    ImageName:['']
  })
  ngOnInit() {
    this.departmentService.getDepartments();
    //GET USER DATA
    // this.usersService.getUserProfile().subscribe(
    //   res => {
    //     this.userDetails = res;
    //   },
    //   err => {
    //     console.log(err)
    //   }
    // )   
    this.usersService.getUsers();
    this.usersService.getUserProfile().subscribe(
      res => {
        this.userDetails = res,
        this.fillForm(res);
      },
      err => {

      }
    ) 
    
    // this.profileForm.setValue({
    //   FullName :[this.userDetails.fullName],
    //   UserName : [this.userDetails.userName],
    //   Email : [this.userDetails.email],
    //   PhoneNumber: [this.userDetails.phoneNumber],
    //   DepartmentId:[this.userDetails.departmentId]
    // })
  }
  fillForm(details){
    this.profileForm.setValue({
      FullName :[details.fullName],
      UserName : [details.userName],
      Email : [details.email],
      PhoneNumber: [details.phoneNumber],
      DepartmentId:[details.departmentId]
    })
  }
}
