import { Component, OnInit } from '@angular/core';
import { MeetingsAttendanceService, MeetingsService, EmployeesService, ApplicationUserService } from 'src/app/shared/employees.service';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-meetings-attendance',
  templateUrl: './meetings-attendance.component.html',
  styleUrls: ['./meetings-attendance.component.scss']
})
export class MeetingsAttendanceComponent implements OnInit {

  constructor(private meetingAttendanceService : MeetingsAttendanceService,private meetingService : MeetingsService,private userService : ApplicationUserService,private fb : FormBuilder) { }
  attendanceForm = this.fb.group({
    MeetingsId : [''],
    EmployeeId : [''],
    Status :[false],
    attendance : this.fb.array([this.meetingFormGroup()])
  })

  ngOnInit() {
    this.meetingService.getMeetings();
    this.userService.getUsers();
  }
  //GET ATTENDANCE FORM
  // get attendanceArray(){
  //   return <FormArray>this.attendanceForm.get('attendance');
  // }
  meetingFormGroup(){
    return this.fb.group({
        EmployeeId : [''],
        Status :[false]
    })
  }
  // addProjectFormArray(){
  //   this.attendanceArray.push(this.meetingFormGroup());
  // }
}
