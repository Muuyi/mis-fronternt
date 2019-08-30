import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TasksService, EmployeesService } from 'src/app/shared/employees.service';
import { ToastrService } from 'ngx-toastr';
import { Tasks } from 'src/app/shared/employees.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  task = Tasks;

  constructor(private tasksService : TasksService,private employeesService : EmployeesService,private toastr : ToastrService) { }

  ngOnInit() {
    this.tasksService.getTasks();
    this.employeesService.getEmployee();
  }
   //RESET FORM
   resetForm(form? : NgForm){
    if(form != null)
      form.reset();
      this.tasksService.tasksData = {
        Id:null,
        TaskSubject : '',
        Description : '',
        StartDate : '',
        EndDate : '',
        CreatedDate : '',
        EmployeesId : null
      }
  }
  //SUBMIT FORM
  onSubmit(form : NgForm){
    this.insertRecord(form);
  }
  //INSERT RECORD
  insertRecord(form : NgForm){
    this.tasksService.postTasks(form.value).subscribe(res => { 
      this.toastr.success('Record inserted successfully','Meetings addition');
      this.tasksService.getTasks();
      this.resetForm(form);
    })
  }
   //DELETE EMPLOYEES
   onDelete(id:number){
    if(confirm("Are you sure you want to delete this record?")){
      this.tasksService.deleteTask(id).subscribe(res=>{
        this.tasksService.getTasks();
        this.toastr.warning('Record deleted successfully!!','Task Delete');
      })
    }
  }
}
