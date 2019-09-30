import { Component, OnInit } from '@angular/core';
import { ProjectsService, ApplicationUserService } from 'src/app/shared/employees.service';

@Component({
  selector: 'app-projects-progress-details',
  templateUrl: './projects-progress-details.component.html',
  styleUrls: ['./projects-progress-details.component.scss']
})
export class ProjectsProgressDetailsComponent implements OnInit {
  details = [];
  constructor(private projectService : ProjectsService,private userService : ApplicationUserService) { }

  ngOnInit() {
    this.projectService.share.subscribe(x=>this.details = x);
    this.userService.getUsers();
  }
  onSubmit(){
    alert("Hello");
  }

}
