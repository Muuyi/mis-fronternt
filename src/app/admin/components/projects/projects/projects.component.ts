import { Component, OnInit } from '@angular/core';
import { ProjectsService, EmployeesService, ApplicationUserService } from 'src/app/shared/employees.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm,FormBuilder } from '@angular/forms';
import { Projects } from 'src/app/shared/employees.model';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import  pdfMake from "pdfmake/build/pdfmake";
import  pdfFonts  from "pdfmake/build/vfs_fonts";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  closeResult : string;

  constructor(private projectService : ProjectsService, private toastr : ToastrService,private userService : ApplicationUserService, private fb : FormBuilder,private modalService: NgbModal,private http : HttpClient) { }
  projectsForm = this.fb.group({
    Id : [0],
    ProjectName : [''],
    StartDate : [''],
    EndDate : [''],
    ApplicationUserId :[''] 
  })
  ngOnInit() {
    //RESET FORM
    // this.resetForm();
    this.userService.getUsers();
    this.projectService.getProjects();
  }
  //  //RESET FORM
  //  resetForm(form? : NgForm){
  //   if(form != null)
  //     form.reset();
  //     this.projectService.projectData = {
  //       Id:null,
  //       ProjectName : '',
  //       StartDate : '',
  //       EndDate : '',
  //       CreatedDate : '',
  //       EmployeesId : null
  //     }
     
  //   }
  //SUBMIT FORM
  onSubmit(){
    var id 
    if(this.projectsForm.value.Id == null){
      id = 0;
    }else{
      id = this.projectsForm.value.Id
    }
    var body = {
      Id : id,
      ProjectName : this.projectsForm.value.ProjectName,
      StartDate : this.projectsForm.value.StartDate,
      EndDate : this.projectsForm.value.EndDate,
      ApplicationUserId :this.projectsForm.value.ApplicationUserId 
    }
    // this.insertRecord(form);
    if(this.projectsForm.value.Id > 0){
      this.http.put(environment.rootApi+'/projects/'+this.projectsForm.value.Id,body).subscribe(res=>{
        this.toastr.info('Record updated successfully','Projects records');
        this.projectService.getProjects();
        this.projectsForm.reset();
        this.modalService.dismissAll();
      })
    }else{
      this.http.post(environment.rootApi+'/projects',body).subscribe(res=>{
        this.toastr.success('Record inserted successfully','Projects Records');
        this.projectService.getProjects();
        this.projectsForm.reset();
        this.modalService.dismissAll();
      })
    }
    // this.insertRecord(form);
  }
  //POPULATE PROJECTS MODAL
  editData(content,proj){
    this.projectsForm.setValue({
      Id : proj.id,
      ProjectName : proj.projectName,
      StartDate : new Date(proj.startDate).toISOString().substring(0, 10),
      EndDate : new Date(proj.endDate).toISOString().substring(0, 10),
      ApplicationUserId : proj.applicationUserId
    })
    this.openModal(content);
  }
  /////UPDATE DETAILS CONTENT
  updateDetailsContent(proj){
    this.projectService.projectDetails(proj);
  }
  //INSERT RECORD
  // insertRecord(form : NgForm){
  //   this.projectService.postProject(form.value).subscribe(res => { 
  //     this.toastr.success('Record inserted successfully','Meetings addition');
  //     this.projectService.getProjects();
  //     // this.resetForm(form);
  //   })
  // }
  //OPEN PROJECTS MODAL
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
  //DELETE PROJECTS
  onDelete(id:number){
    if(confirm("Are you sure you want to delete this record?")){
      this.projectService.deleteProject(id).subscribe(res=>{
        this.projectService.getProjects();
        this.toastr.warning('Record deleted successfully!!','Project Delete');
      })
    }
  }
  //GENERATE PDF
  generatePdf(): void{
    var tableData = [
      [{text:'SERIAL NO',style:'tableHeader'},{text:'PROJECT NAME',style:'tableHeader'},{text:'START DATE',style:'tableHeader'},{text:'END DATE',style:'tableHeader'},{text:'EMPLOYEE NAME',style:'tableHeader'},{text:'DATE POSTED',style:'tableHeader'}]
    ]
    var projectList = this.projectService.projectsList;
    projectList.forEach(data);
    function data(key,value){
      tableData.push([key.id,key.projectName,key.startDate,key.endDate,key.applicationUser.fullName,key.createdDate]); 
    }
    var dd = {
      pageSize:'A4',
      pageOrientation:'landscape',
      content: [
        {
          text:'PROJECTS REPORT',
          style:'header'
        },
        { 
          // layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 50, 'auto','auto', 'auto','auto','auto' ],
  
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
  pdfMake.createPdf(dd).download('ProjectsReport.pdf');
  }

}
