import { Component, OnInit } from '@angular/core';
import { TasksProgress } from 'src/app/shared/employees.model';
import { TasksProgressService, TasksService } from 'src/app/shared/employees.service';
import { NgForm, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import { ToastrService } from 'ngx-toastr';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-tasks-progress',
  templateUrl: './tasks-progress.component.html',
  styleUrls: ['./tasks-progress.component.scss']
})
export class TasksProgressComponent implements OnInit {
  formData : TasksProgress;
  closeResult : string;
  constructor(private tasksProgresService : TasksProgressService, private toastr : ToastrService,private dialog : MatDialog,private modalService: NgbModal,private tasksService : TasksService, private fb : FormBuilder,private http : HttpClient ) { }
  progressForm = this.fb.group({
    Id : [0],
    TasksId : [''],
    Comments : [''],
    Status : [''],
    Metric : ['']
  })

  ngOnInit() {
    //RESET FORM
    // this.resetForm();
    //TASKS SERVICE
    this.tasksService.getTasks();
    //TASKS PROGRESS SERVICE
    this.tasksProgresService.getTasksProgress();
  }
  //SLIDER LABEL
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1) {
      return Math.round(value / 1) + '%';
    }

    return value;
  }
  //  //RESET FORM
  //  resetForm(form? : NgForm){
  //   if( form != null)
  //     form.resetForm();
  //   this.formData = {
  //     Id : null,
  //     TasksId:null,
  //     Comments:'',
  //     Status:'',
  //     Metric:null,
  //     CreatedDate:null,
  //   }
  //   }
  //SUBMIT FORM DATA
  onSubmit(){
    var body = {
      Id : this.progressForm.value.Id,
      TasksId : this.progressForm.value.TasksId,
      Comments : this.progressForm.value.Comments,
      Status : this.progressForm.value.Status,
      Metric : this.progressForm.value.Metric
    }
    var tasksForm = {
      Id : this.progressForm.value.TasksId,
      Status : this.progressForm.value.Status,
      Metric : this.progressForm.value.Metric
    }
    // this.insertRecord(form);
    if(this.progressForm.value.Id > 0){
      this.http.put(environment.rootApi+'/tasksProgress/'+this.progressForm.value.Id,body).subscribe(res=>{
        this.toastr.info('Record updated successfully','Tasks Progress records');
        this.tasksProgresService.getTasksProgress();
        this.progressForm.reset();
        this.modalService.dismissAll();
      })
    }else{
      this.http.post(environment.rootApi+'/tasksProgress',body).subscribe(res=>{
        this.toastr.success('Record inserted successfully','Tasks Progress Records');
        this.tasksProgresService.getTasksProgress();
        this.progressForm.reset();
        this.modalService.dismissAll();
      })   
    }
    this.http.patch(environment.rootApi+'/tasks/'+this.progressForm.value.TasksId,tasksForm).subscribe();
    // console.log(tasksForm +' - '+this.progressForm.value.TasksId)
  }
  //TASKS PROGRESS
  //POPULATE TASKS RECORDS
  editData(content,task){
    this.progressForm.setValue({
      Id : task.id,
      TasksId : task.tasksId,
      Comments : task.comments,
      Status : task.status,
      Metric : task.metric
    })
    this.openModal(content);
  }
  // insertRecord(form:NgForm){ 
  //   this.tasksProgresService.postTasksProgress(form.value).subscribe(res=>{
  //     this.toastr.success('Record inserted successfully','Tasks Progress addition');
  //     this.tasksProgresService.getTasksProgress();
  //     this.resetForm(form);
  //   })
  // }
  //POPULATE EMPLOYEES RECORDS
  // populateEmployeesForm(content,emp:TasksProgress){
  //   this.formData = Object.assign({},emp);
  //   // console.log(this.employeeService.formData);
  //   this.openModal(content);
  // }
  //EDIT AND ADD DATA OPEN MODAL WINDOW
  openModal(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });      
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
   //GENERATE PDF
   generatePdf(): void{
    var tableData = [
      [{text:'SERIAL NO',style:'tableHeader'},{text:'TASK NAME',style:'tableHeader'},{text:'PROGRESS',style:'tableHeader'},{text:'COMMENTS',style:'tableHeader'},{text:'STATUS',style:'tableHeader'},{text:'CREATED DATE',style:'tableHeader'}]
    ]
    var tasksProgressList = this.tasksProgresService.tasksProgressList;
    tasksProgressList.forEach(data);
    function data(key,value){
      console.log(key);
      tableData.push([key.id,key.taskSubject,key.metric+'%',key.description,key.status,key.createdDate]); 
    }
    var dd = {
      pageSize:'A4',
      pageOrientation:'landscape',
      content: [
        {
          text:'TASKS PROGRESS REPORT',
          style:'header'
        },
        { 
          // layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 50, 'auto','auto', 'auto','auto','auto' ],
  
            body: tableData
          }
        }
      ],
      styles:{
        header:{
          fontSize:15,
          bold:true,
          alignment:'center'
        },
        tableHeader:{
          bold:true,
          alignment:'center',
          fontSize:15
        }
      }
    };
  pdfMake.createPdf(dd).download('TasksProgressReport.pdf');
  }

}
