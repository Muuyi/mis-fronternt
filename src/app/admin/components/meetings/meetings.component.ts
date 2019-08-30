import { Component, OnInit } from '@angular/core';
import { MeetingsService } from 'src/app/shared/employees.service';
import { Meetings } from 'src/app/shared/employees.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {
  meeting = Meetings;

  constructor(private meetingsService : MeetingsService, private toastr : ToastrService) { }

  ngOnInit() {
    //RESET FORM
    this.resetForm();
    //GET MEETINGS
    this.meetingsService.getMeetings();
  }
  //RESET FORM
  resetForm(form? : NgForm){
    if(form != null)
      form.reset();
      this.meetingsService.meetingsData = {
        Id:null,
        Subject : '',
        Description : '',
        MeetingDate : '',
        CreatedDate : ''
      }
  }
  //SUBMIT FORM
  onSubmit(form : NgForm){
    this.insertRecord(form);
  }
  //INSERT RECORD
  insertRecord(form : NgForm){
    this.meetingsService.postCustomer(form.value).subscribe(res => { 
      this.toastr.success('Record inserted successfully','Meetings addition');
      this.meetingsService.getMeetings();
      this.resetForm(form);
    })
  }
  //DELETE MEETINGS
  onDelete(id:number){
    if(confirm("Are you sure you want to delete this record?")){
      this.meetingsService.deleteMeeting(id).subscribe(res=>{
        this.meetingsService.getMeetings();
        this.toastr.warning('Record deleted successfully!!','Meeting Delete');
      })
    }
  }

}
