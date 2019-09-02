import { Component, OnInit } from '@angular/core';
import { TasksProgress } from 'src/app/shared/employees.model';
import { TasksProgressService, TasksService } from 'src/app/shared/employees.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tasks-progress',
  templateUrl: './tasks-progress.component.html',
  styleUrls: ['./tasks-progress.component.scss']
})
export class TasksProgressComponent implements OnInit {
  formData : TasksProgress;
  closeResult : string;
  constructor(private tasksProgresService : TasksProgressService, private toastr : ToastrService,private dialog : MatDialog,private modalService: NgbModal,private tasksService : TasksService ) { }

  ngOnInit() {
    //RESET FORM
    this.resetForm();
    //TASKS SERVICE
    this.tasksService.getTasks();
    //TASKS PROGRESS SERVICE
    this.tasksProgresService.getTasksProgress();
  }
   //RESET FORM
   resetForm(form? : NgForm){
    if( form != null)
      form.resetForm();
    this.formData = {
      Id : null,
      TasksId:null,
      Comments:'',
      Status:'',
      Metric:null,
      CreatedDate:null,
    }
  }
  //SUBMIT FORM DATA
  onSubmit(form: NgForm){
    this.insertRecord(form);
  }
  insertRecord(form:NgForm){ 
    this.tasksProgresService.postTasksProgress(form.value).subscribe(res=>{
      this.toastr.success('Record inserted successfully','Tasks Progress addition');
      this.tasksProgresService.getTasksProgress();
      this.resetForm(form);
    })
  }
  //POPULATE EMPLOYEES RECORDS
  populateEmployeesForm(content,emp:TasksProgress){
    this.formData = Object.assign({},emp);
    // console.log(this.employeeService.formData);
    this.openModal(content);
  }
  //EDIT AND ADD DATA OPEN MODAL WINDOW
  openModal(content) {
    // if(index == null){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
     
    // }else{
    //   this.getEmployeeData = index;
    //   this.modalService.open(content);
    //   console.log(this.employeeService.formData);
    // }
      
  }
  //DISMISS MODAL WINDOW
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  //DELETE EMPLOYEES
  onDelete(id:number){
    if(confirm("Are you sure you want to delete this record?")){
      this.tasksProgresService.deleteTasksProgress(id).subscribe(res=>{
        this.tasksProgresService.getTasksProgress();
        this.toastr.warning('Record deleted successfully!!','Tasks Progres Delete');
      })
    }
  }

}
