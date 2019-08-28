import { Component, OnInit } from '@angular/core';
import { AdministratorsService, ApplicationUserService } from '../shared/employees.service';
import { Administrators } from '../shared/employees.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user : Administrators;
  constructor(private usersService : ApplicationUserService,private router : Router,private toastr : ToastrService) { }

  ngOnInit() {

  }
  onSubmit(form : NgForm){
    this.usersService.login(form.value).subscribe(
      (res : any) =>{
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl("/admin");
      },
      err => {
        if(err.status == 400)
          this.toastr.error('Incorrect username or password','Authentication failed');
        else
          console.log(err);
      } 
    );
  }

}
