import { Component, OnInit } from '@angular/core';
import { MeetingsService } from 'src/app/shared/employees.service';
import { Meetings } from 'src/app/shared/employees.model';
import { NgForm, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {
  closeResult : string;

  constructor(private meetingsService : MeetingsService, private toastr : ToastrService,private fb: FormBuilder,private http: HttpClient,private modalService: NgbModal) { }
  meetingForm = this.fb.group({
    Id:[0],
    Subject : [''],
    Description :[''],
    MeetingDate :[''],
    MeetingTime : ['']
  })

  ngOnInit() {
    //RESET FORM
    // this.resetForm();
    //GET MEETINGS
    this.meetingsService.getMeetings();
  }
  updateDetailsContent(data){
    this.meetingsService.meetingsDetails(data);
  }
  //RESET FORM
  // resetForm(form? : NgForm){
  //   if(form != null)
  //     form.reset();
  //     this.meetingsService.meetingsData = {
  //       Id:null,
  //       Subject : '',
  //       Description : '',
  //       MeetingDate : '',
  //       CreatedDate : ''
  //     }
  // }
  //SUBMIT FORM
  onSubmit(){
    var id 
    if(this.meetingForm.value.Id == null){
      id = 0;
    }else{
      id = this.meetingForm.value.Id
    }
    var body = {
      Id :parseInt(id),
      Subject : this.meetingForm.value.Subject,
      Description : this.meetingForm.value.Description,
      MeetingDate : this.meetingForm.value.MeetingDate,
      MeetingTime : this.meetingForm.value.MeetingTime
    }
    if(this.meetingForm.value.Id > 0){
      this.http.put(environment.rootApi+'/meetings/'+this.meetingForm.value.Id,body).subscribe(res=>{
        this.toastr.info('Record updated successfully','Departments editing');
        this.meetingsService.getMeetings();
        this.meetingForm.reset();
        this.modalService.dismissAll();
      })
    }else{
      this.http.post(environment.rootApi+'/meetings',body).subscribe(res=>{
        this.toastr.success('Record inserted successfully','Meetings records');
        this.meetingsService.getMeetings();
        this.meetingForm.reset();
        this.modalService.dismissAll();
      })
    }
  }
  //INSERT RECORD
  // insertRecord(form : NgForm){
  //   this.meetingsService.postCustomer(form.value).subscribe(res => { 
  //     this.toastr.success('Record inserted successfully','Meetings addition');
  //     this.meetingsService.getMeetings();
  //     // this.resetForm(form);
  //   })
  // }
  //POPULATE EMPLOYEES RECORDS
  editData(content,meeting){
    this.meetingForm.setValue({
      Id:meeting.id,
      Subject : meeting.subject,
      Description :meeting.description,
      MeetingDate :new Date(meeting.meetingDate).toISOString().substring(0, 10),
      MeetingTime :meeting.meetingTime
    })
    this.openModal(content);
  }
   //EDIT AND ADD DATA OPEN MODAL WINDOW
   openModal(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
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
