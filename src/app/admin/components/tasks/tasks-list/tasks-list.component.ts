import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { TasksService, EmployeesService, ApplicationUserService } from 'src/app/shared/employees.service';
import { ToastrService } from 'ngx-toastr';
import { Tasks } from 'src/app/shared/employees.model';
import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  closeResult : string;

  constructor(private tasksService : TasksService,private userService : ApplicationUserService,private toastr : ToastrService, private fb : FormBuilder,private http : HttpClient,private modalService: NgbModal) { }
  tasksForm = this.fb.group({
    Id : [0],
    TaskSubject :[''],
    Description : [''],
    StartDate : [''],
    EndDate : [''],
    ApplicationUserId : ['']
  })

  ngOnInit() {
    this.tasksService.getTasks();
    this.userService.getUsers();
    // this.employeesService.getEmployee();
    // console.log(this.employeesService.employeesList);
  }
   //RESET FORM
  //  resetForm(form? : NgForm){
  //   if(form != null)
  //     form.reset();
  //     this.tasksService.tasksData = {
  //       Id:null,
  //       TaskSubject : '',
  //       Description : '',
  //       StartDate : '',
  //       EndDate : '',
  //       CreatedDate : '',
  //       EmployeesId : null
  //     }
  //   }
  //SUBMIT FORM
  onSubmit(){
    var id 
    if(this.tasksForm.value.Id == null){
      id = 0;
    }else{
      id = this.tasksForm.value.Id
    }
    var body = {
      Id : id,
      TaskSubject :this.tasksForm.value.TaskSubject,
      Description : this.tasksForm.value.Description,
      StartDate : this.tasksForm.value.StartDate,
      EndDate : this.tasksForm.value.EndDate,
      ApplicationUserId : this.tasksForm.value.ApplicationUserId
    }
    if(this.tasksForm.value.Id > 0){
      this.http.put(environment.rootApi+'/tasks/'+this.tasksForm.value.Id,body).subscribe(res=>{
        this.toastr.info('Record updated successfully','Tasks records');
        this.tasksService.getTasks();
        this.tasksForm.reset();
        this.modalService.dismissAll();
      })
    }else{
      this.http.post(environment.rootApi+'/tasks',body).subscribe(res=>{
        this.toastr.success('Record inserted successfully','Tasks Records');
        this.tasksService.getTasks();
        this.tasksForm.reset();
        this.modalService.dismissAll();
      })
    }
    // this.insertRecord(form);
  }
  //POPULATE TASKS RECORDS
  editData(content,task){
    this.tasksForm.patchValue({
      Id : task.id,
      TaskSubject : task.taskSubject,
      Description : task.description,
      StartDate : new Date(task.startDate).toISOString().substring(0, 10),
      EndDate : new Date(task.endDate).toISOString().substring(0, 10),
      ApplicationUserId : task.applicationUserId
    })
    this.openModal(content);
  }
  //INSERT RECORD
  // insertRecord(form : NgForm){
  //   this.tasksService.postTasks(form.value).subscribe(res => { 
  //     this.toastr.success('Record inserted successfully','Meetings addition');
  //     this.tasksService.getTasks();
  //     this.resetForm(form);
  //   })
  // }
   //DELETE EMPLOYEES
  onDelete(id:number){
    if(confirm("Are you sure you want to delete this record?")){
      this.tasksService.deleteTask(id).subscribe(res=>{
        this.tasksService.getTasks();
        this.toastr.warning('Record deleted successfully!!','Task Delete');
      })
    }
  }
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
   //GENERATE PDF
   generatePdf(): void{
    var tableData = [
      [{text:'S/NO',style:'tableHeader'},{text:'TASK NAME',style:'tableHeader'},{text:'DESCRIPTION',style:'tableHeader'},{text:'START DATE',style:'tableHeader'},{text:'END DATE',style:'tableHeader'},{text:'EMPLOYEE NAME',style:'tableHeader'},{text:'POSTED DATE',style:'tableHeader'}]
    ]
    var tasksList = this.tasksService.tasksList;
    tasksList.forEach(data);
    function data(key,value){
      tableData.push([key.id,key.taskSubject,key.description,key.startDate,key.endDate,key.applicationUser.fullName,key.createdDate]); 
    }
    console.log(tableData);
    var dd = {
      pageSize:'A4',
      pageOrientation:'landscape',
      content: [
        {
          text:'TASKS REPORT',
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
