import { Component, OnInit } from '@angular/core';
import { ProjectsService, EmployeesService } from 'src/app/shared/employees.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Projects } from 'src/app/shared/employees.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
 project : Projects;
 projectsList : Projects[];

  constructor(private projectService : ProjectsService, private toastr : ToastrService,private employeesService : EmployeesService) { }

  ngOnInit() {
    //RESET FORM
    this.resetForm();
    this.employeesService.getEmployee();
    this.projectService.projectsList;
    this.projectService.getProjects();
  }
   //RESET FORM
   resetForm(form? : NgForm){
    if(form != null)
      form.reset();
      this.projectService.projectData = {
        Id:null,
        ProjectName : '',
        StartDate : '',
        EndDate : '',
        CreatedDate : '',
        EmployeesId : null
      }
     
  }
  //SUBMIT FORM
  onSubmit(form : NgForm){
    this.insertRecord(form);
  }
  //INSERT RECORD
  insertRecord(form : NgForm){
    this.projectService.postProject(form.value).subscribe(res => { 
      this.toastr.success('Record inserted successfully','Meetings addition');
      this.projectService.getProjects();
      this.resetForm(form);
    })
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
