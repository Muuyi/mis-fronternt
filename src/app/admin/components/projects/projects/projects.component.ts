import { Component, OnInit } from '@angular/core';
import { ProjectsService, EmployeesService } from 'src/app/shared/employees.service';
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

  constructor(private projectService : ProjectsService, private toastr : ToastrService,private employeesService : EmployeesService, private fb : FormBuilder,private modalService: NgbModal,private http : HttpClient) { }
  projectsForm = this.fb.group({
    Id : [0],
    ProjectName : [''],
    StartDate : [''],
    EndDate : [''],
    EmployeeId :[''] 
  })
  ngOnInit() {
    //RESET FORM
    // this.resetForm();
    this.employeesService.getEmployee();
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
  onSubmit(form : NgForm){
    var body = {
      Id : this.projectsForm.value.Id,
      ProjectName : this.projectsForm.value.ProjectName,
      StartDate : this.projectsForm.value.StartDate,
      EndDate : this.projectsForm.value.EndDate,
      EmployeeId :this.projectsForm.value.EmployeeId 
    }
    // this.insertRecord(form);
    if(this.projectsForm.value.Id == 0){
      this.http.post(environment.rootApi+'/projects',body).subscribe(res=>{
        this.toastr.success('Record inserted successfully','Projects Records');
        this.projectService.getProjects();
        this.projectsForm.reset();
        this.modalService.dismissAll();
      })
    }else{
      this.http.put(environment.rootApi+'/projects/'+this.projectsForm.value.Id,body).subscribe(res=>{
        this.toastr.info('Record updated successfully','Projects records');
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
      StartDate : proj.startDate,
      EndDate : proj.endDate,
      EmployeeId : proj.employeeId
    })
    this.openModal(content);
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

}
