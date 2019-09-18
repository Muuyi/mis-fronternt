import { Component, OnInit } from '@angular/core';
import { AdministratorsService, ApplicationUserService, DepartmentsService } from 'src/app/shared/employees.service';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-application-user',
  templateUrl: './application-user.component.html',
  styleUrls: ['./application-user.component.scss']
})
export class ApplicationUserComponent implements OnInit {
  closeResult : string;
 
  constructor(public userService : ApplicationUserService,private modalService: NgbModal,private toastr : ToastrService,public departmentService : DepartmentsService) { }
  ngOnInit() {
    this.userService.formModel.reset();
    this.departmentService.getDepartments();
    this.userService.getUsers();
  }
  //SUBMIT FORM
  onSubmit(){
    this.userService.register().subscribe(
      (res : any) => {
        if(res.succeeded){
          this.toastr.success('Record inserted successfully','User registration');
          this.userService.formModel.reset();
          this.userService.getUsers();
        }else{
          res.errors.forEach(element => {
            switch(element.code){
              case 'DuplicateUserName':
                this.toastr.error('Username already taked','User registration');
                break;
              default:
                  this.toastr.error(element.description,'User registration');
                  break;
            }
          });
        }
      },
      err => {
        console.log(err)
      }
    );
  }
   //EDIT AND ADD DATA OPEN MODAL WINDOW
   openModal(content,id,index) {
    if(id == null){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }else{

    }
      
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
    //GENERATE PDF
    generatePdf(): void{
      var tableData = [
        [{text:'EMPLOYEE NAME',style:'tableHeader'},{text:'EMAIL',style:'tableHeader'},{text:'PHONE',style:'tableHeader'},{text:'USERNAME',style:'tableHeader'},{text:'DEPARTMENT',style:'tableHeader'}]
      ]
      var userList = this.userService.userList;
      userList.forEach(data);
      function data(key,value){
        tableData.push([key.fullName,key.email,key.phoneNumber,key.userName,key.department.departmentName]); 
      }
      var dd = {
        pageSize:'A4',
        pageOrientation:'landscape',
        content: [
          {
            text:'EMPLOYEES REPORT',
            style:'header'
          },
          { 
            // layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ '*', '*','*','*','*'],
    
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
    pdfMake.createPdf(dd).download('EmployeesReport.pdf');
    }

}
