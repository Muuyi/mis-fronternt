import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from './material/material.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PersonalDetailsComponent } from './admin/components/users/personal-details/personal-details.component';
import { ChangePasswordComponent } from './admin/components/users/change-password/change-password.component';
import { EmployeesService,DepartmentsService,CustomersService, MeetingsService,MeetingsAttendanceService, TasksService, ProjectsService, LeaveService,LeaveHolderService,TicketsService, AdministratorsService, ApplicationUserService, TasksProgressService, ProjectsProgressService, TicketsProgressService, MeetingProgressService } from './shared/employees.service';
import { MeetingsComponent } from './admin/components/meetings/meetings.component';
import { TasksListComponent } from './admin/components/tasks/tasks-list/tasks-list.component';
import { ProjectsComponent } from './admin/components/projects/projects/projects.component';
import { TicketsComponent } from './admin/components/tickets/tickets/tickets.component';
import { LeaveComponent } from './admin/components/leave/leave/leave.component';
import { EmployeesListComponent } from './admin/components/users/employees-list/employees-list.component';
import { ApplicationUserComponent } from './admin/components/users/application-user/application-user.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { TasksProgressComponent } from './admin/components/tasks/tasks-progress/tasks-progress.component';
import { ProjectsProgressComponent } from './admin/components/projects/projects-progress/projects-progress.component';
import { TicketsProgressComponent } from './admin/components/tickets/tickets-progress/tickets-progress.component';
import { DepartmentsComponent } from './admin/components/users/departments/departments.component';
import { LeavelistComponent } from './admin/components/leave/leavelist/leavelist.component';
import { MeetingsAttendanceComponent } from './admin/components/meetings/meetings-attendance/meetings-attendance.component';
import { MatSliderModule } from '@angular/material';
import { MeetingsProgressComponent } from './admin/components/meetings/meetings-progress/meetings-progress.component';
import { MeetingsDetailsComponent } from './admin/components/meetings/meetings-details/meetings-details.component';
import { MeetingsProgressDetailsComponent } from './admin/components/meetings/meetings-progress/meetings-progress-details/meetings-progress-details.component';
import { ProjectsProgressDetailsComponent } from './admin/components/projects/projects-progress/projects-progress-details/projects-progress-details.component';
import { TicketsProgressDetailsComponent } from './admin/components/tickets/tickets-progress/tickets-progress-details/tickets-progress-details.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PageNotFoundComponent,
    PersonalDetailsComponent,
    ChangePasswordComponent,
    ProjectsComponent,
    ApplicationUserComponent,
    TasksProgressComponent,
    ProjectsProgressComponent,
    TicketsProgressComponent,
    DepartmentsComponent,
    LeavelistComponent,
    MeetingsAttendanceComponent,
    MeetingsProgressComponent,
    MeetingsDetailsComponent,
    MeetingsProgressDetailsComponent,
    ProjectsProgressDetailsComponent,
    TicketsProgressDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    DataTablesModule,
    MaterialModule,
    AngularFontAwesomeModule,
    NgbModule,
    MatSliderModule,
    MatDialogModule,
    NgxSmartModalModule.forRoot(),
  ],
  exports:[
    MatSliderModule
  ],
  entryComponents : [EmployeesListComponent],
  providers: [EmployeesService,DepartmentsService,CustomersService,MeetingsService,MeetingsAttendanceService,MeetingProgressService,TasksService,ProjectsService,LeaveService,LeaveHolderService,TicketsService,AdministratorsService,ApplicationUserService,TasksProgressService,ProjectsProgressService,TicketsProgressService,{
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
