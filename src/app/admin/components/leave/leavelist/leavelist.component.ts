import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm,FormBuilder } from '@angular/forms';

import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LeaveHolderService, LeaveService, EmployeesService, ApplicationUserService } from 'src/app/shared/employees.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-leavelist',
  templateUrl: './leavelist.component.html',
  styleUrls: ['./leavelist.component.scss']
})
export class LeavelistComponent implements OnInit {
  closeResult : string;
  constructor(private toastr : ToastrService,private http : HttpClient,private fb : FormBuilder,private modalService:NgbModal,private leaveHolderService : LeaveHolderService,private leaveService : LeaveService,private userService : ApplicationUserService) { }
  leaveHolderForm = this.fb.group({
    Id : [0],
    LeaveId : [''],
    ApplicationUserId : ['']
  })

  ngOnInit() {
    this.leaveHolderService.getLeaveHolder();
    this.leaveService.getLeave();
    this.userService.getUsers();
  }
  //SUBMIT FORM
  onSubmit(form : NgForm){
    var body = {
      Id : this.leaveHolderForm.value.Id,
      LeaveId : this.leaveHolderForm.value.LeaveId,
      ApplicationUserId : this.leaveHolderForm.value.ApplicationUserId,
     
    }
    // this.insertRecord(form);
    if(this.leaveHolderForm.value.Id == 0){
      this.http.post(environment.rootApi+'/leaveHolder',body).subscribe(res=>{
        this.toastr.success('Record inserted successfully','Leave Holder Records');
        this.leaveHolderService.getLeaveHolder();
        this.leaveHolderForm.reset();
        this.modalService.dismissAll();
      })
    }else{
      this.http.put(environment.rootApi+'/leaveHolder/'+this.leaveHolderForm.value.Id,body).subscribe(res=>{
        this.toastr.info('Record updated successfully','Leave Holder Records');
        this.leaveHolderService.getLeaveHolder();
        this.leaveHolderForm.reset();
        this.modalService.dismissAll();
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
  //POPULATE PROJECTS MODAL
  editData(content,lv){
    this.leaveHolderForm.setValue({
      Id : lv.id,
      LeaveId : lv.leaveId,
      ApplicationUserId : lv.applicationUserId
    })
    this.openModal(content);
  }
  //DELETE LEAVE
  onDelete(id:number){
    if(confirm("Are you sure you want to delete this record?")){
      this.leaveHolderService.deleteHolderLeave(id).subscribe(res=>{
        this.leaveHolderService.getLeaveHolder();
        this.toastr.warning('Record deleted successfully!!','Leave Delete');
      })
    }
  }
  //GENERATE PDF
  generatePdf(): void{
    var tableData = [
      [{text:'S/NO',style:'tableHeader'},{text:'EMPLOYEE NAME',style:'tableHeader'},{text:'START DATE',style:'tableHeader'},{text:'END DATE',style:'tableHeader'},{text:'PLACEHOLDER NAME',style:'tableHeader'},{text:'DATE CREATED',style:'tableHeader'}]
    ]
    var leaveList = this.leaveHolderService.leaveHolderList;
    leaveList.forEach(data);
    function data(key,value){
      tableData.push([key.id,key.leave.applicationUser.fullName,key.leave.startDate,key.leave.endDate,key.applicationUser.fullName,key.createdDate]); 
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
            widths: [ 'auto', 'auto','auto','auto','auto','auto'],
  
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
