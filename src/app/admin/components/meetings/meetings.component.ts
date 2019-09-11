import { Component, OnInit } from '@angular/core';
import { MeetingsService } from 'src/app/shared/employees.service';
import { Meetings } from 'src/app/shared/employees.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  //GENERATE PDF
  generatePdf(): void{
    var tableData = [
      [{text:'S/NO',style:'tableHeader'},{text:'MEETING SUBJECT',style:'tableHeader'},{text:'DESCRIPTION',style:'tableHeader'},{text:'MEETING DATE',style:'tableHeader'},{text:'CREATED DATE',style:'tableHeader'}]
    ]
    var dataList = this.meetingsService.meetingsList;
    dataList.forEach(data);
    function data(key,value){
      tableData.push([key.id,key.subject,key.description,key.meetingDate,key.createdDate]); 
    }
    console.log(tableData);
    var dd = {
      pageSize:'A4',
      pageOrientation:'landscape',
      content: [
        {
          text:'MEETINGS REPORT',
          style:'header'
        },
        { 
          // layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 50, '*', '*', '*','*'],

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
  pdfMake.createPdf(dd).download('MeetingsReport.pdf');
  }
}
