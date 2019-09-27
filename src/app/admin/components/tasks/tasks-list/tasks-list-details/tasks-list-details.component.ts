import { Component, OnInit } from '@angular/core';
import { TasksService, ApplicationUserService } from 'src/app/shared/employees.service';
import { FormBuilder } from '@angular/forms';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-tasks-list-details',
  templateUrl: './tasks-list-details.component.html',
  styleUrls: ['./tasks-list-details.component.scss']
})
export class TasksListDetailsComponent implements OnInit {
  details = [];
  id:any;
  metric : any;
  status : any;
  // if(this.details){
  //   this.id = this.details.applicationUserId,
  //   this.metric = this.details.metric,
  //   this.status = this.details.status
  // }
  constructor(private tasksService : TasksService, private userService : ApplicationUserService, private fb : FormBuilder) { }
  
  ngOnInit() {
    this.tasksService.share.subscribe(x => this.details = x);
    this.userService.getUsers();
  }
  // fillForm(id,metric,status){

  // }
}
