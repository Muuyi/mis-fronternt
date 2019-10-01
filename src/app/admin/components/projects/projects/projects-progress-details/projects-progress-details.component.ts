import { Component, OnInit } from '@angular/core';
import { ProjectsService, ApplicationUserService } from 'src/app/shared/employees.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-progress-details',
  templateUrl: './projects-progress-details.component.html',
  styleUrls: ['./projects-progress-details.component.scss']
})
export class ProjectsProgressDetailsComponent implements OnInit {
  details = [];
  constructor(private projectService : ProjectsService,private userService : ApplicationUserService, private http : HttpClient,private toastr : ToastrService, private route : Router) { }

  ngOnInit() {
    this.projectService.share.subscribe(x=>this.details = x);
    this.userService.getUsers();
  }
  onSubmit(){
    var body = {
      ApplicationUserId :this.projectService.projectDetailForm.value.ApplicationUserId,
      Metric :this.projectService.projectDetailForm.value.Metric,
      Id : this.projectService.projectDetailForm.value.Id,
      ProjectName : this.projectService.projectDetailForm.value.ProjectName,
      StartDate : this.projectService.projectDetailForm.value.StartDate,
      EndDate : this.projectService.projectDetailForm.value.EndDate
      
    }
    var progressForm = {
      ApplicationUserId :this.projectService.projectDetailForm.value.ApplicationUserId,
      ProjectsId : this.projectService.projectDetailForm.value.Id,
      Metric :this.projectService.projectDetailForm.value.Metric,
      Comments : this.projectService.projectDetailForm.value.Comments
    }
    console.log(progressForm);
    this.http.post(environment.rootApi+'/projectsProgress',progressForm).subscribe(res=>{
      this.http.put(environment.rootApi+'/projects/'+this.projectService.projectDetailForm.value.Id,body).subscribe(res=>{
        this.toastr.info('Record updated successfully','Projects Progress records');
        this.route.navigate(['admin/projects']);
      })
    })
  }

}
