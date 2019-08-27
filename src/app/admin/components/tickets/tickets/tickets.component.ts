import { Component, OnInit } from '@angular/core';
import { TicketsService, EmployeesService } from 'src/app/shared/employees.service';
import { Tickets } from 'src/app/shared/employees.model';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  formData : Tickets;
  ticketsList : Tickets[];
  closeResult: string;
  constructor(private ticketsService : TicketsService,private toastr : ToastrService,private modalService: NgbModal,private employeesService : EmployeesService) { }

  ngOnInit() {
    this.ticketsService.getTickets();
    this.employeesService.getEmployee();
  }
  //RESET FORM
  resetForm(form? : NgForm){
    if( form != null)
      form.resetForm();
    this.formData = {
      Id : null,
      EmployeesId:null,
      CreatedDate:''
    }
  }
  //SUBMIT FORM DATA
  onSubmit(form: NgForm){
    console.log(form);
    this.insertRecord(form);
  }
  insertRecord(form:NgForm){ 
    this.ticketsService.postTicket(form.value).subscribe(res=>{
      this.toastr.success('Record inserted successfully','Employee registration');
      this.resetForm(form);
    })
  }
  //EDIT AND ADD DATA
  openEmployeesModal(content,id,index) {
    if(id == null){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }else{
      this.formData = this.ticketsList[index];
      this.modalService.open(content);
      debugger;
      console.log(this.formData);

    }
      
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

}
