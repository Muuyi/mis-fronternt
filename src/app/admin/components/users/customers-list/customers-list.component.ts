import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable,Subject } from 'rxjs';

import { CustomersService } from 'src/app/shared/employees.service';
import { Customers } from 'src/app/shared/employees.model';
import { NgForm } from '@angular/forms';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  customer : Customers;
  closeResult: string;
  constructor(private customerService:CustomersService, private toastr:ToastrService,private modalService: NgbModal) { }
  
  ngOnInit() {
    this.resetForm();
    this.customerService.getCustomers();
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
      this.customerService.customersData = {
        Id:null,
        Name : '',
        Email : '',
        Phone : null,
        Address : ''
      }
  }
  //SUBMIT FORM
  onSubmit(form : NgForm){
    this.insertRecord(form);
  }
  //INSERT RECORD
  insertRecord(form : NgForm){
    this.customerService.postCustomer(form.value).subscribe(res => { 
      this.toastr.success('Record inserted successfully','User Registration');
      this.customerService.getCustomers();
      this.resetForm(form);
    })
  }
  //DELETE EMPLOYEES
  onDelete(id:number){
    if(confirm("Are you sure you want to delete this record?")){
      this.customerService.deleteCustomers(id).subscribe(res=>{
        this.customerService.getCustomers();
        this.toastr.warning('Record deleted successfully!!','Customer Delete');
      })
    }
  }
  //GENERATE PDF
  generatePdf(): void{
    var tableData = [
      [{text:'Customer name',style:'tableHeader'},{text:'Email',style:'tableHeader'},{text:'Phone',style:'tableHeader'},{text:'Address',style:'tableHeader'}]
    ]
    var customerList = this.customerService.customersList;
    customerList.forEach(data);
    function data(key,value){
      tableData.push([key.name,key.email,key.phone,key.address]); 
    }
    console.log(tableData);
    var dd = {
      content: [
        {
          text:'Customers Report',
          style:'header'
        },
        { 
          // layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
  
            body: tableData
            // [
            //   [ 'First', 'Second', 'Third', 'The last one' ],
            //   [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
            //   [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
            // ]
          }
        }
      ],
      styles:{
        header:{
          fontSize:18,
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
  pdfMake.createPdf(dd).download('Customers.pdf');
  }
}
