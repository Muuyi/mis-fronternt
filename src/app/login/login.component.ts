import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/employees.service';
import { Users } from '../shared/employees.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user : Users;
  constructor(private usersService : UsersService) { }

  ngOnInit() {

  }

}
