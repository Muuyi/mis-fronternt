import { Component, OnInit } from '@angular/core';
import { MeetingsService } from 'src/app/shared/employees.service';

@Component({
  selector: 'app-meetings-details',
  templateUrl: './meetings-details.component.html',
  styleUrls: ['./meetings-details.component.scss']
})
export class MeetingsDetailsComponent implements OnInit {
  details = [];
  constructor(private meetingsService : MeetingsService) { }

  ngOnInit() {
    this.meetingsService.share.subscribe(x => this.details = x);
  }
}
