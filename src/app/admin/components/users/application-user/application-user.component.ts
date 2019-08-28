import { Component, OnInit } from '@angular/core';
import { AdministratorsService } from 'src/app/shared/employees.service';

@Component({
  selector: 'app-application-user',
  templateUrl: './application-user.component.html',
  styleUrls: ['./application-user.component.scss']
})
export class ApplicationUserComponent implements OnInit {

  constructor(public adminService : AdministratorsService) { }

  ngOnInit() {
  }

}
