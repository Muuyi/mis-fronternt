import { Component, OnInit } from '@angular/core';
import { LeaveService, EmployeesService } from 'src/app/shared/employees.service';
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

  constructor(private leaveService : LeaveService,private employeesService : EmployeesService,private toastr : ToastrService,private http : HttpClient,private fb : FormBuilder,private modalService:NgbModal) { }
  leaveForm = this.fb.group({
    Id : [0],
    EmployeeId : [''],
    StartDate : [''],
    EndDate : [''],
    PlaceholderId : ['']
  })
  ngOnInit() {
    //RESET FORM
    // this.resetForm();
    this.leaveService.getLeave();
    this.employeesService.getEmployee();
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
    var body = {
      Id : this.leaveForm.value.Id,
      EmployeeId : this.leaveForm.value.EmployeeId,
      StartDate : this.leaveForm.value.StartDate,
      EndDate : this.leaveForm.value.EndDate,
      PlaceholderId : this.leaveForm.value.PlaceholderId
    }
    // this.insertRecord(form);
    if(this.leaveForm.value.Id == 0){
      this.http.post(environment.rootApi+'/ticketsProgress',body).subscribe(res=>{
        this.toastr.success('Record inserted successfully','Leave Records');
        this.leaveService.getLeave();
        this.leaveForm.reset();
        this.modalService.dismissAll();
      })
    }else{
      this.http.put(environment.rootApi+'/ticketsProgress/'+this.leaveForm.value.Id,body).subscribe(res=>{
        this.toastr.info('Record updated successfully','Leave Records');
        this.leaveService.getLeave();
        this.leaveForm.reset();
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
}
