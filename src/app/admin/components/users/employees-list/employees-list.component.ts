import { Component, OnInit, ViewChildren } from '@angular/core';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { EmployeesService, DepartmentsService } from 'src/app/shared/employees.service';
import { NgForm, FormBuilder } from '@angular/forms';
import { Observable,Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { MatDialog, MatDialogConfig, throwToolbarMixedModesError } from '@angular/material';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Employees } from 'src/app/shared/employees.model';

import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import * as $ from 'jquery'; 
declare var $:any;
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  formData : Employees;
  employeesList :Employees[];
  closeResult: string;
  //DEPARTMENTS LIST
  // departmentList : Departments[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChildren(DataTableDirective) dtElement: DataTableDirective;
  constructor(private employeeService: EmployeesService,private departmentService:DepartmentsService, private toastr : ToastrService,private dialog : MatDialog,private modalService: NgbModal, private fb : FormBuilder ) { }
  //EMPLOYEES FORM
  employeesForm = this.fb.group({
    EmployeeId :[0],
    FirstName:[''],
    LastName:[''],
    Email:[''],
    Phone:[''],
    DepartmentId:['']
  });
  ngOnInit() {
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

  //SUBMIT FORM DATA
  onSubmit(form: NgForm){
    var body = {
      EmployeeId: this.employeesForm.value.EmployeeId,
      FirstName: this.employeesForm.value.FirstName,
      LastName : this.employeesForm.value.LastName,
      Email : this.employeesForm.value.Email,
      Phone : this.employeesForm.value.Phone,
      DepartmentId : this.employeesForm.value.DepartmentId
    }
    this.insertRecord(body);
  }
  insertRecord(body){ 
    this.employeeService.postEmployee(body).subscribe(res=>{
      this.toastr.success('Record inserted successfully','Employee registration');
      this.employeesForm.reset();
      this.employeeService.getEmployee();
    })
  }
  //POPULATE EMPLOYEES RECORDS
  // populateEmployeesForm(content,emp:Employees){
  //   this.formData = emp;
  //   console.log(emp);
  //   this.openEmployeesModal(content);
  // }
  editData(content,emp,i){
    this.employeesForm.setValue({
      EmployeeId : emp.employeeId,
      EmployeeName:emp.departmentName
    })
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
  //GENERATE PDF
  generatePdf(): void{
    var tableData = [
      [{text:'S/NO',style:'tableHeader'},{text:'EMPLOYEE NAME',style:'tableHeader'},{text:'EMAIL',style:'tableHeader'},{text:'PHONE',style:'tableHeader'},{text:'DEPARTMENT',style:'tableHeader'}]
    ]
    var dataList = this.employeeService.employeesList;
    dataList.forEach(data);
    function data(key,value){
      tableData.push([key.employeeId,key.firstName+' '+key.lastName,key.email,key.phone,key.department.departmentName]); 
    }
    var dd = {
      pageSize:'A4',
      pageOrientation:'landscape',
      content: [
        {
          text:'DEPARTMENTS REPORT',
          style:'header'
        },
        { 
          // layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', '*','*','*', '*'],
  
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
  pdfMake.createPdf(dd).download('Employees Report.pdf');
  }
}
