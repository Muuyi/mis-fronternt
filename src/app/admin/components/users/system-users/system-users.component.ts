import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AdministratorsService, EmployeesService } from 'src/app/shared/employees.service';
import { Administrators } from 'src/app/shared/employees.model';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-system-users',
  templateUrl: './system-users.component.html',
  styleUrls: ['./system-users.component.scss']
})
export class SystemUsersComponent implements OnInit {
  user : Administrators;
  closeResult: string;
  constructor(private usersService : AdministratorsService,private employeesService : EmployeesService,private toastr: ToastrService,private modalService: NgbModal) { }

  ngOnInit() {
    this.resetForm();
    //Get employees list
    this.employeesService.getEmployee();
    //GET USERS LIST
    this.usersService.getUsers();
  }
  //OPEN MODAL
  openModal(content) {
    // if(index == null){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }
  //DISMISS MODAL
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  //RESET FORM
  resetForm(form? : NgForm){
    if(form != null)
    form.reset();
    this.user = {
      Id:0,
      Username:'',
      Password:'',
      EmployeesId:0,
      CreatedDate:null
    }
  }
  //SUBMIT FORM
  onSubmit(form : NgForm){
    this.insertRecord(form);
  }
  //INSERT RECORD
  insertRecord(form : NgForm){
    this.usersService.postUsers(form.value).subscribe(res => { 
      this.toastr.success('Record inserted successfully','User Registration');
      this.usersService.getUsers();
      this.resetForm(form);
    })
  }
  //DELETE EMPLOYEES
  onDelete(id:number){
    if(confirm("Are you sure you want to delete this record?")){
      this.usersService.deleteUsers(id).subscribe(res=>{
        this.usersService.getUsers();
        this.toastr.warning('Record deleted successfully!!','User Delete');
      })
    }
  }
}
