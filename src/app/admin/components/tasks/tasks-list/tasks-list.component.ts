import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TasksService, EmployeesService } from 'src/app/shared/employees.service';
import { ToastrService } from 'ngx-toastr';
import { Tasks } from 'src/app/shared/employees.model';
import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
   //GENERATE PDF
   generatePdf(): void{
    var tableData = [
      [{text:'S/NO',style:'tableHeader'},{text:'TASK NAME',style:'tableHeader'},{text:'DESCRIPTION',style:'tableHeader'},{text:'START DATE',style:'tableHeader'},{text:'END DATE',style:'tableHeader'},{text:'EMPLOYEE NAME',style:'tableHeader'},{text:'POSTED DATE',style:'tableHeader'}]
    ]
    var tasksList = this.tasksService.tasksList;
    tasksList.forEach(data);
    function data(key,value){
      tableData.push([key.id,key.taskSubject,key.description,key.startDate,key.endDate,key.employeesId,key.createdDate]); 
    }
    console.log(tableData);
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
            widths: [ 50, 'auto', 'auto', 'auto','auto','auto','auto'],
  
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
  pdfMake.createPdf(dd).download('TasksReport.pdf');
  }
}
