import { Component, OnInit } from '@angular/core';
import { TasksService, ApplicationUserService } from 'src/app/shared/employees.service';
import { FormBuilder } from '@angular/forms';
import { identifierModuleUrl } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  constructor(private tasksService : TasksService, private userService : ApplicationUserService, private fb : FormBuilder,private http : HttpClient,private toastr : ToastrService,private route : Router) { }
  
  ngOnInit() {
    this.tasksService.share.subscribe(x => this.details = x);
    this.userService.getUsers();
  }
  onSubmit(){
    var body = {
      Id : this.tasksService.taskDetailForm.value.Id,
      TaskSubject : this.tasksService.taskDetailForm.value.TaskSubject,
      Description : this.tasksService.taskDetailForm.value.Description,
      StartDate : this.tasksService.taskDetailForm.value.StartDate,
      EndDate : this.tasksService.taskDetailForm.value.EndDate,
      ApplicationUserId :this.tasksService.taskDetailForm.value.ApplicationUserId,
      Metric :this.tasksService.taskDetailForm.value.Metric,
      Status : this.tasksService.taskDetailForm.value.Status,
      CreatedDate: this.tasksService.taskDetailForm.value.CreatedDate
      
    }
    var progressForm = {
      TasksId : this.tasksService.taskDetailForm.value.TasksId,
      Metric :this.tasksService.taskDetailForm.value.Metric,
      Status : this.tasksService.taskDetailForm.value.Status,
      ApplicationUserId :this.tasksService.taskDetailForm.value.ApplicationUserId,
      Comments : this.tasksService.taskDetailForm.value.Comments
    }
    this.http.post(environment.rootApi+'/tasksProgress',progressForm).subscribe(res=>{
      this.http.put(environment.rootApi+'/tasks/'+this.tasksService.taskDetailForm.value.Id,body).subscribe(res=>{
        this.toastr.info('Record updated successfully','Tasks Progress records');
        this.route.navigate(['admin/tasks']);
      })
    })
  }
  // fillForm(id,metric,status){

  // }
}
