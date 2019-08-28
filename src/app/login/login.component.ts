import { Component, OnInit } from '@angular/core';
import { AdministratorsService } from '../shared/employees.service';
import { Administrators } from '../shared/employees.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user : Administrators;
  constructor(private usersService : AdministratorsService) { }

  ngOnInit() {

  }

}
