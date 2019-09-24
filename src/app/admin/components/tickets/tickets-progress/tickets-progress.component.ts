import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { TicketsProgress } from 'src/app/shared/employees.model';
import { TicketsProgressService, TicketsService } from 'src/app/shared/employees.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-tickets-progress',
  templateUrl: './tickets-progress.component.html',
  styleUrls: ['./tickets-progress.component.scss']
})
export class TicketsProgressComponent implements OnInit {
  closeResult : string;
  constructor(private ticketsProgressService : TicketsProgressService,private ticketsService : TicketsService,private toastr : ToastrService,private modalService:NgbModal,private http : HttpClient,private fb : FormBuilder) { }
  progressForm = this.fb.group({
    Id : [0],
    Comments : [''],
    Status : [''],
    TicketsId : ['']
  })
  ngOnInit() {
    //RESET FORM
    // this.resetForm();
    //TICKETS PROGRESS LIST
    this.ticketsProgressService.getTicketsProgress();
    //TICKETS LIST
    this.ticketsService.getTickets();
  }
  //RESET FORM
  // resetForm(form? : NgForm){
  //   if( form != null)
  //     form.resetForm();
  //   this.formData = {
  //     Id : null,
  //     TicketsId:null,
  //     Comments:'',
  //     Status:null,
  //     CreatedDate:null,
  //   }
  // }
  //SUBMIT FORM DATA
  onSubmit(){
    var id 
    if(this.progressForm.value.Id == null){
      id = 0;
    }else{
      id = this.progressForm.value.Id
    }
    // this.insertRecord(form);
    var body = {
      Id :id,
      Comments : this.progressForm.value.Comments,
      Status : this.progressForm.value.Status,
      TicketsId : this.progressForm.value.TicketsId
    }
    if(this.progressForm.value.Id > 0){
      this.http.put(environment.rootApi+'/ticketsProgress/'+this.progressForm.value.Id,body).subscribe(res=>{
        this.toastr.info('Record updated successfully','Tickets Progress Records');
        this.ticketsProgressService.getTicketsProgress();
        this.progressForm.reset();
        this.modalService.dismissAll();
      })
      
    }else{
      this.http.post(environment.rootApi+'/ticketsProgress',body).subscribe(res=>{
        this.toastr.success('Record inserted successfully','Tickets Progress Records');
        this.ticketsProgressService.getTicketsProgress();
        this.progressForm.reset();
        this.modalService.dismissAll();
      })
    }
  }
  //POPULATE PROJECTS MODAL
  editData(content,ticket){
    this.progressForm.setValue({
      Id : ticket.id,
      Comments : ticket.comments,
      Status : ticket.status,
      TicketsId : ticket.ticketsId
    })
    this.openModal(content);
  }
  // insertRecord(form:NgForm){ 
  //   this.ticketsProgressService.postTicketProgress(form.value).subscribe(res=>{
  //     this.toastr.success('Record inserted successfully','Tickets progress');
  //     this.ticketsProgressService.getTicketsProgress();
  //     this.resetForm(form);
  //   })
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
      this.ticketsProgressService.deleteTicketProgress(id).subscribe(res=>{
        this.ticketsProgressService.getTicketsProgress();
        this.toastr.warning('Record deleted successfully!!','Ticket progress');
      })
    }
  }
   //GENERATE PDF
   generatePdf(): void{
    var tableData = [
      [{text:'SERIAL NO',style:'tableHeader'},{text:'TICKET TITLE',style:'tableHeader'},{text:'STATUS',style:'tableHeader'},{text:'COMMENTS',style:'tableHeader'},{text:'DATE CREATED',style:'tableHeader'}]
    ]
    var ticketList = this.ticketsProgressService.ticketsProgressList;
    ticketList.forEach(data);
    function data(key,value){
      tableData.push([key.id,key.ticketsId+' ('+key.tickets.applicationUser.fullName+')',key.status,key.comments,key.createdDate]); 
    }
    var dd = {
      pageSize:'A4',
      pageOrientation:'landscape',
      content: [
        {
          text:'TICKETS PROGRESS REPORT',
          style:'header'
        },
        { 
          // layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 50, '*','*','*','*'],
  
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
  pdfMake.createPdf(dd).download('TicketsProgressReport.pdf');
  }
}
