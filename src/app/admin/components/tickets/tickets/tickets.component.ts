import { Component, OnInit } from '@angular/core';
import { TicketsService, EmployeesService } from 'src/app/shared/employees.service';
import { Tickets } from 'src/app/shared/employees.model';
import { NgForm, FormBuilder } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  formData : Tickets;
  ticketsList : Tickets[];
  closeResult: string;
  constructor(private ticketsService : TicketsService,private toastr : ToastrService,private modalService: NgbModal,private employeesService : EmployeesService,private fb : FormBuilder,private http : HttpClient) { }
  ticketsForm = this.fb.group({
    Id : [0],
    EmployeeId : ['']
  })
  ngOnInit() {
    // this.resetForm();
    this.ticketsService.getTickets();
    this.employeesService.getEmployee();
  }
  //RESET FORM
  // resetForm(form? : NgForm){
  //   if( form != null)
  //     form.resetForm();
  //   this.formData = {
  //     Id : null,
  //     EmployeesId:null,
  //     CreatedDate:''
  //   }
  // }
  //SUBMIT FORM DATA
  onSubmit(form: NgForm){
    var body = {
      Id : this.ticketsForm.value.Id,
      EmployeeId:this.ticketsForm.value.EmployeeId,
    }
    // this.insertRecord(form);
    if(this.ticketsForm.value.Id == 0){
      this.http.post(environment.rootApi+'/tickets',body).subscribe(res=>{
        this.toastr.success('Record inserted successfully','Tickets Records');
        this.ticketsService.getTickets();
        this.ticketsForm.reset();
        this.modalService.dismissAll();
      })
    }else{
      this.http.put(environment.rootApi+'/tickets/'+this.ticketsForm.value.Id,body).subscribe(res=>{
        this.toastr.info('Record updated successfully','Tickets Records');
        this.ticketsService.getTickets();
        this.ticketsForm.reset();
        this.modalService.dismissAll();
      })
    }
  }
  //POPULATE PROJECTS MODAL
  editData(content,ticket){
    this.ticketsForm.setValue({
      Id : ticket.id,
      EmployeeId : ticket.employeeId
    })
    this.openModal(content);
  }
  // insertRecord(form:NgForm){ 
  //   // this.ticketsService.postTicket(form.value).subscribe(res=>{
  //   //   this.toastr.success('Record inserted successfully','Ticket registration');
  //   //   this.ticketsService.getTickets();
  //   //   this.resetForm(form);
  //   // })
  // }
  //EDIT AND ADD DATA
  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });  
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  //DELETE TICKETS
  onDelete(id:number){
    if(confirm("Are you sure you want to delete this record?")){
      this.ticketsService.deleteTicket(id).subscribe(res=>{
        this.ticketsService.getTickets();
        this.toastr.warning('Record deleted successfully!!','Ticket Delete');
      })
    }
  }
  //GENERATE PDF
  generatePdf(): void{
    var tableData = [
      [{text:'SERIAL NO',style:'tableHeader'},{text:'EMPLOYEE NAME',style:'tableHeader'},{text:'DATE',style:'tableHeader'}]
    ]
    var ticketList = this.ticketsService.ticketsList;
    ticketList.forEach(data);
    function data(key,value){
      tableData.push([key.id,key.employee.firstName+' '+key.employee.lastName,key.createdDate]); 
    }
    var dd = {
      pageSize:'A4',
      pageOrientation:'portrait',
      content: [
        {
          text:'TICKETS REPORT',
          style:'header'
        },
        { 
          // layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 50, '*','*'],
  
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
  pdfMake.createPdf(dd).download('TicketsReport.pdf');
  }
}
