import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable,Subject } from 'rxjs';

import { CustomersService } from 'src/app/shared/employees.service';
import { Customers } from 'src/app/shared/employees.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  customer = Customers;

  constructor(private customerService:CustomersService, private toastr:ToastrService) { }

  ngOnInit() {
    this.customerService.getCustomers();
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
      this.resetForm(form);
    })
  }

}
