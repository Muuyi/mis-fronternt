import { Component, OnInit } from '@angular/core';
import { LeaveService, EmployeesService, ApplicationUserService } from 'src/app/shared/employees.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm,FormBuilder } from '@angular/forms';
import { Leave } from 'src/app/shared/employees.model';

import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  closeResult : string;

  constructor(private leaveService : LeaveService,private userService : ApplicationUserService,private toastr : ToastrService,private http : HttpClient,private fb : FormBuilder,private modalService:NgbModal) { }
  leaveForm = this.fb.group({
    Id : [0],
    ApplicationUserId : [''],
    Type : [''],
    StartDate : [''],
    EndDate : ['']
  })
  ngOnInit() {
    //RESET FORM
    // this.resetForm();
    this.leaveService.getLeave();
    this.userService.getUsers();
  }
  //RESET FORM
  // resetForm(form? : NgForm){
  //   if(form != null)
  //     form.reset();
  //     this.leaveService.leaveData = {
  //       Id:null,
  //       EmployeesId : null,
  //       StartDate : '',
  //       EndDate : '',
  //       CreatedDate : '',
  //       PlaceholderId : null
  //     }
  // }
  //SUBMIT FORM
  onSubmit(form : NgForm){
    var id 
    if(this.leaveForm.value.Id == null){
      id = 0;
    }else{
      id = this.leaveForm.value.Id
    }
    var body = {
      Id : this.leaveForm.value.Id,
      ApplicationUserId : this.leaveForm.value.ApplicationUserId,
      Type : this.leaveForm.value.Type,
      StartDate : this.leaveForm.value.StartDate,
      EndDate : this.leaveForm.value.EndDate
    }
    // this.insertRecord(form);
    if(this.leaveForm.value.Id > 0){
      this.http.put(environment.rootApi+'/leave/'+this.leaveForm.value.Id,body).subscribe(res=>{
        this.toastr.info('Record updated successfully','Leave Records');
        this.leaveService.getLeave();
        this.leaveForm.reset();
        this.modalService.dismissAll();
      })
    }else{
      this.http.post(environment.rootApi+'/leave',body).subscribe(res=>{
        this.toastr.success('Record inserted successfully','Leave Records');
        this.leaveService.getLeave();
        this.leaveForm.reset();
        this.modalService.dismissAll();
      })
    }
  }
  //POPULATE PROJECTS MODAL
  editData(content,lv){
    this.leaveForm.patchValue({
      Id : lv.id,
      ApplicationUserId : lv.applicationUserId,
      Type : lv.type,
      StartDate : new Date(lv.startDate).toISOString().substring(0,10),
      EndDate : new Date(lv.endDate).toISOString().substring(0,10)
    })
    this.openModal(content);
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
  //INSERT RECORD
  // insertRecord(form : NgForm){
  //   this.leaveService.postLeave(form.value).subscribe(res => { 
  //     this.toastr.success('Record inserted successfully','Leave Record');
  //     this.leaveService.getLeave();
  //     this.resetForm(form);
  //   })
  // }
   //DELETE LEAVE
   onDelete(id:number){
    if(confirm("Are you sure you want to delete this record?")){
      this.leaveService.deleteLeave(id).subscribe(res=>{
        this.leaveService.getLeave();
        this.toastr.warning('Record deleted successfully!!','Leave Delete');
      })
    }
  }
   //GENERATE PDF
   generatePdf(): void{
    var tableData = [
      [{text:'S/NO',style:'tableHeader'},{text:'EMPLOYEE NAME',style:'tableHeader'},{text:'LEAVE TYPE',style:'tableHeader'},{text:'START DATE',style:'tableHeader'},{text:'END DATE',style:'tableHeader'},{text:'DATE CREATED',style:'tableHeader'}]
    ]
    var leaveList = this.leaveService.leaveList;
    leaveList.forEach(data);
    function data(key,value){
      tableData.push([key.id,key.applicationUser.fullName,key.type,key.startDate,key.endDate,key.createdDate]); 
    }
    var dd = {
      pageSize:'A4',
      pageOrientation:'landscape',
      content: [
        {
          text:'LEAVE REPORT',
          style:'header'
        },
        { 
          // layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 50, 'auto','auto','auto','auto','auto'],
  
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
  pdfMake.createPdf(dd).download('LeaveListReport.pdf');
  }
}
