import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApplicationUserService } from 'src/app/shared/employees.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  userDetails;
  formData = {
    FullName : '',
    UserName : '',
    Email : ''
  }
  constructor(private usersService : ApplicationUserService) { }

  ngOnInit() {
    //GET USER DATA
    this.usersService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err)
      }
    )    
  }

}
