import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Departments } from 'src/app/shared/employees.model';
import { DepartmentsService } from 'src/app/shared/employees.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  formData : Departments;
  closeResult : string;
  
  constructor(private departmentsService : DepartmentsService,private toastr : ToastrService,private modalService: NgbModal,private fb : FormBuilder,private http : HttpClient) { }
  departmentsForm = this.fb.group({
    DepartmentId : [0],
    DepartmentName : ['',[Validators.required,Validators.minLength(3)]]
  });
  ngOnInit() {
    //DEPARTMENTS SERVICE
    this.departmentsService.getDepartments();
  }
  //SUBMIT FORM DATA
  onSubmit(){
    var body = {
      DepartmentId : this.departmentsForm.value.DepartmentId,
      DepartmentName : this.departmentsForm.value.DepartmentName
    }
    if(this.departmentsForm.value.DepartmentId == 0){
      this.http.post(environment.rootApi+'/departments',body).subscribe(res=>{
        this.toastr.success('Record inserted successfully','Departments addition');
        this.departmentsService.getDepartments();
        this.departmentsForm.reset();
        this.modalService.dismissAll();
      })
    }else{
      this.http.put(environment.rootApi+'/departments/'+this.departmentsForm.value.DepartmentId,body).subscribe(res=>{
        this.toastr.info('Record updated successfully','Departments editing');
        this.departmentsService.getDepartments();
        this.departmentsForm.reset();
        this.modalService.dismissAll();
      })
    }
    // this.insertRecord(body);
  }
  //POPULATE EMPLOYEES RECORDS
editData(content,dep,i){
  this.departmentsForm.setValue({
    DepartmentId : dep.departmentId,
    DepartmentName:dep.departmentName
  })
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
  //GENERATE PDF
  generatePdf(): void{
    var tableData = [
      [{text:'S/NO',style:'tableHeader'},{text:'DEPARTMENT NAME',style:'tableHeader'}]
    ]
    var dataList = this.departmentsService.departmentsList;
    dataList.forEach(data);
    function data(key,value){
      tableData.push([key.departmentId,key.departmentName]); 
    }
    var dd = {
      pageSize:'A4',
      pageOrientation:'portrait',
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
            widths: [ '*', '*'],
  
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
  pdfMake.createPdf(dd).download('DepartmentsReport.pdf');
  }
}
