import { Component, OnInit } from '@angular/core';
import { MeetingsAttendanceService, MeetingsService, EmployeesService, ApplicationUserService } from 'src/app/shared/employees.service';

@Component({
  selector: 'app-meetings-attendance',
  templateUrl: './meetings-attendance.component.html',
  styleUrls: ['./meetings-attendance.component.scss']
})
export class MeetingsAttendanceComponent implements OnInit {

  constructor(private meetingAttendanceService : MeetingsAttendanceService,private meetingService : MeetingsService,private userService : ApplicationUserService) { }

  ngOnInit() {
    this.meetingService.getMeetings();
    this.userService.getUsers();
  }

}
