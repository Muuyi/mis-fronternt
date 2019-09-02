import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Departments } from 'src/app/shared/employees.model';
import { DepartmentsService } from 'src/app/shared/employees.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  formData : Departments;
  closeResult : string;
  constructor(private departmentsService : DepartmentsService,private toastr : ToastrService,private modalService: NgbModal) { }

  ngOnInit() {
    //RESET FORM
    this.resetForm();
    //DEPARTMENTS SERVICE
    this.departmentsService.getDepartments();
  }
  //RESET FORM
  resetForm(form? : NgForm){
    if( form != null)
      form.resetForm();
    this.formData = {
      Id : null,
      DepartmentName : '',
      CreatedDate : null
    }
  }
  //SUBMIT FORM DATA
  onSubmit(form: NgForm){
    console.log(form);
    this.insertRecord(form);
  }
  insertRecord(form:NgForm){ 
    this.departmentsService.postDepartments(form.value).subscribe(res=>{
      this.toastr.success('Record inserted successfully','Employee registration');
      this.departmentsService.getDepartments();
      this.resetForm(form);
    })
  }
  //POPULATE EMPLOYEES RECORDS
  populateEmployeesForm(content,dep:Departments){
    this.formData = {
      Id : dep.Id,
      DepartmentName : dep.DepartmentName
    }
    console.log('Id '+dep.Id);
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
      this.departmentsService.deleteDepartments(id).subscribe(res=>{
        this.departmentsService.getDepartments();
        this.toastr.warning('Record deleted successfully!!','Departments Delete');
      })
    }
  }

}
