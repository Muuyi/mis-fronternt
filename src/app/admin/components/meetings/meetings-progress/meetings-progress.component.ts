import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MeetingsService, MeetingProgressService, ApplicationUserService } from 'src/app/shared/employees.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-meetings-progress',
  templateUrl: './meetings-progress.component.html',
  styleUrls: ['./meetings-progress.component.scss']
})
export class MeetingsProgressComponent implements OnInit {
  displayProjectForm = true;
  closeResult : string;
  constructor(private toastr : ToastrService,private modalService: NgbModal,private fb : FormBuilder,private http : HttpClient,private meetingService : MeetingsService,private progressService : MeetingProgressService, private userService : ApplicationUserService) { }
  progressForm = this.fb.group({
    Id : ['0'],
    MeetingsId : [''],
    MeetingStatus : [''],
    Description : [''],
    ProjectName:[''],
    StartDate : [''],
    EndDate : [''],
    ApplicationUserId : ['']
  })
  ngOnInit() {
    this.meetingService.getMeetings();
    this.progressService.getMeetingProgress();
    this.userService.getUsers();
  }
  //SUBMIT FORM DATA
  onSubmit(){
    var id 
    if(this.progressForm.value.Id == null){
      id = 0;
    }else{
      id = this.progressForm.value.Id
    }
    var body = {
      Id : parseInt(id),
      MeetingsId:this.progressForm.value.MeetingsId,
      MeetingStatus : this.progressForm.value.MeetingStatus,
      Description : this.progressForm.value.Description,
    }
    var projectForm = {
      ProjectName : this.progressForm.value.ProjectName,
      StartDate : this.progressForm.value.StartDate,
      EndDate : this.progressForm.value.EndDate,
      ApplicationUserId :this.progressForm.value.ApplicationUserId 
    }
    var historyBody = {
      MeetingsId:this.progressForm.value.MeetingsId,
      MeetingStatus : this.progressForm.value.MeetingStatus
    }
    // this.insertRecord(form);
    if(this.progressForm.value.Id > 0){
      this.http.put(environment.rootApi+'/meetingProgress/'+this.progressForm.value.Id,body).subscribe(res=>{
        this.toastr.info('Record updated successfully','Meeting Progress Records');
        this.progressService.getMeetingProgress();
        this.progressForm.reset();
        this.modalService.dismissAll();
      })
    }else{
      this.http.post(environment.rootApi+'/meetingProgress',body).subscribe(res=>{
        this.toastr.success('Record inserted successfully','Meeting Progress Records');
        this.progressService.getMeetingProgress();
        this.progressForm.reset();
        this.modalService.dismissAll();
      }) 
    }
    //POSTING PROJECTS
    if(this.progressForm.value.MeetingStatus == 'Project'){
      this.http.post(environment.rootApi+'/projects',projectForm).subscribe(res=>{
        // this.toastr.success('Record inserted successfully','Meeting Progress Records');
        // this.progressService.getMeetingProgress();
        // this.progressForm.reset();
        // this.modalService.dismissAll();
      }) 
    }
    this.http.post(environment.rootApi+'/meetingsProgressHistory',historyBody).subscribe(); 
  }
  //POPULATE PROJECTS MODAL
  editData(content,meet){
    this.progressForm.patchValue({
      Id : meet.id,
      MeetingsId : meet.meetingsId,
      MeetingStatus : meet.meetingStatus,
      Description : meet.description
    })
    this.openModal(content);
  }
  //MEETINGS PROGRESS DETAILS
  updateDetailsContent(data,id){
    this.progressService.meetingsProgressDetails(data,id);
  }
  //DELETE PROGRESS
  onDelete(id:number){
    if(confirm("Are you sure you want to delete this record?")){
      this.progressService.deleteMeetingProgress(id).subscribe(res=>{
        this.progressService.getMeetingProgress();
        this.toastr.warning('Record deleted successfully!!','Meeting Delete');
      })
    }
  }
  //ADD FIELDS
  addFields(){
    if(this.progressForm.value.MeetingStatus == 'Project'){
      this.displayProjectForm = false;    
    }else{
      this.displayProjectForm = true;
    }
    // document.getElementsByClassName("hidden-fields").addClass("display-form");
  }
   //EDIT AND ADD DATA
   openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });  
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  generatePdf(): void{
    var tableData = [
      [{text:'S/No',style:'tableHeader'},{text:'MEETING',style:'tableHeader'},{text:'STATUS',style:'tableHeader'},{text:'DATE',style:'tableHeader'}]
    ]
    var progressList = this.progressService.meetingProgressList;
    progressList.forEach(data);
    function data(key,value){
      tableData.push([key.id,key.meetings.subject,key.meetingStatus,key.createdDate]); 
    }
    var dd = {
      pageSize:'A4',
      pageOrientation:'portrait',
      content: [
        {
          text:'TICKETS REPORT',
          style:'header'
        },
        { 
          // layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 50, 'auto','auto','auto'],
  
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
  pdfMake.createPdf(dd).download('MeetingsProgressReport.pdf');
  }

}
