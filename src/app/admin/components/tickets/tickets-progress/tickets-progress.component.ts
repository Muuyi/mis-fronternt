import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TicketsProgress } from 'src/app/shared/employees.model';
import { TicketsProgressService, TicketsService } from 'src/app/shared/employees.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tickets-progress',
  templateUrl: './tickets-progress.component.html',
  styleUrls: ['./tickets-progress.component.scss']
})
export class TicketsProgressComponent implements OnInit {
  formData : TicketsProgress;
  closeResult : string;
  constructor(private ticketsProgressService : TicketsProgressService,private ticketsService : TicketsService,private toastr : ToastrService,private modalService:NgbModal) { }

  ngOnInit() {
    //RESET FORM
    this.resetForm();
    //TICKETS PROGRESS LIST
    this.ticketsProgressService.getTicketsProgress();
    //TICKETS LIST
    this.ticketsService.getTickets();
  }
  //RESET FORM
  resetForm(form? : NgForm){
    if( form != null)
      form.resetForm();
    this.formData = {
      Id : null,
      TicketsId:null,
      Comments:'',
      Status:null,
      CreatedDate:null,
    }
  }
  //SUBMIT FORM DATA
  onSubmit(form: NgForm){
    this.insertRecord(form);
  }
  insertRecord(form:NgForm){ 
    this.ticketsProgressService.postTicketProgress(form.value).subscribe(res=>{
      this.toastr.success('Record inserted successfully','Tickets progress');
      this.ticketsProgressService.getTicketsProgress();
      this.resetForm(form);
    })
  }
  //POPULATE EMPLOYEES RECORDS
  populateEmployeesForm(content){
    this.formData = Object.assign({});
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
      this.ticketsProgressService.deleteTicketProgress(id).subscribe(res=>{
        this.ticketsProgressService.getTicketsProgress();
        this.toastr.warning('Record deleted successfully!!','Ticket progress');
      })
    }
  }
}
