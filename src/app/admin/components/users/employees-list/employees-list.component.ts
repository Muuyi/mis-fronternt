import { Component, OnInit, ViewChildren } from '@angular/core';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { EmployeesService, DepartmentsService } from 'src/app/shared/employees.service';
import { NgForm } from '@angular/forms';
import { Observable,Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { MatDialog, MatDialogConfig, throwToolbarMixedModesError } from '@angular/material';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Employees } from 'src/app/shared/employees.model';
// import * as $ from 'jquery'; 
declare var $:any;
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employeesList :Employees[];
  closeResult: string;
  //DEPARTMENTS LIST
  // departmentList : Departments[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChildren(DataTableDirective) dtElement: DataTableDirective;
  constructor(private employeeService: EmployeesService,private departmentService:DepartmentsService, private toastr : ToastrService,private dialog : MatDialog,private modalService: NgbModal ) { }

  ngOnInit() {
    //Resetting employees form
    // this.resetForm();
    //Datatables
    this.dtOptions = {
      pagingType:'full_numbers',
      pageLength:5,
      autoWidth:true,
      order : [[0,'desc']]
    };
    this.employeeService.getEmployee();
    this.dtTrigger.next();
    //Getting department list
    this.departmentService.getDepartments();
    //FORM DATA INITIALIZATION
  }
  //RESET FORM
  resetForm(form? : NgForm){
    if( form != null)
      form.resetForm();
    this.employeeService.formData = {
      Id : null,
      FirstName:'',
      LastName:'',
      Email:'',
      Phone:null,
      DepartmentId:0,
    }
  }
  //SUBMIT FORM DATA
  onSubmit(form: NgForm){
    console.log(form);
    this.insertRecord(form);
  }
  insertRecord(form:NgForm){ 
    this.employeeService.postEmployee(form.value).subscribe(res=>{
      this.toastr.success('Record inserted successfully','Employee registration');
      this.employeeService.getEmployee();
      this.resetForm(form);
    })
  }
  //POPULATE EMPLOYEES RECORDS
  populateEmployeesForm(content,emp:Employees){
    this.employeeService.formData = Object.assign({},emp);
    console.log(this.employeeService.formData);
    this.openEmployeesModal(content);
  }
  //EDIT AND ADD DATA OPEN MODAL WINDOW
  openEmployeesModal(content) {
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
      this.employeeService.deleteEmployee(id).subscribe(res=>{
        this.employeeService.getEmployee();
        this.toastr.warning('Record deleted successfully!!','Employee Delete');
      })
    }
  }
}
