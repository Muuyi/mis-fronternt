import { Component, OnInit } from '@angular/core';
import { MeetingProgressService } from 'src/app/shared/employees.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-meetings-progress-details',
  templateUrl: './meetings-progress-details.component.html',
  styleUrls: ['./meetings-progress-details.component.scss']
})
export class MeetingsProgressDetailsComponent implements OnInit {
  details = [];
  meetings:any;
  constructor(private progressService : MeetingProgressService,private http : HttpClient) { }

  ngOnInit() {
    this.progressService.share.subscribe(x => this.details = x);
    this.meetings = this.progressService.getMeetings();
  }
  // getMeetings(){
  //   return this.http.get(environment.rootApi+'/'+this.details.meetingsId).toPromise()
  //   // .then(res=>this.meetingsList = res as Meetings[]);
  // }

}
