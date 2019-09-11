import { Component, OnInit } from '@angular/core';
import { TasksProgress } from 'src/app/shared/employees.model';
import { TasksProgressService, TasksService } from 'src/app/shared/employees.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
   //GENERATE PDF
   generatePdf(): void{
    var tableData = [
      [{text:'SERIAL NO',style:'tableHeader'},{text:'TASK NAME',style:'tableHeader'},{text:'PROGRESS',style:'tableHeader'},{text:'COMMENTS',style:'tableHeader'},{text:'STATUS',style:'tableHeader'},{text:'CREATED DATE',style:'tableHeader'}]
    ]
    var tasksProgressList = this.tasksProgresService.tasksProgressList;
    tasksProgressList.forEach(data);
    function data(key,value){
      tableData.push([key.id,key.tasksId,key.metric,key.comments,key.status,key.createdDate]); 
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
            widths: [ '*', '*', '*', '*','*','*' ],
  
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
