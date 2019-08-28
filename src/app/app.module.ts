import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { HttpClientModule } from "@angular/common/http";
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
import { EmployeesService,DepartmentsService,CustomersService, MeetingsService, TasksService, ProjectsService, LeaveService, TicketsService, AdministratorsService, ApplicationUserService } from './shared/employees.service';
import { MeetingsComponent } from './admin/components/meetings/meetings.component';
import { TasksListComponent } from './admin/components/tasks/tasks-list/tasks-list.component';
import { ProjectsComponent } from './admin/components/projects/projects/projects.component';
import { TicketsComponent } from './admin/components/tickets/tickets/tickets.component';
import { LeaveComponent } from './admin/components/leave/leave/leave.component';
import { EmployeesListComponent } from './admin/components/users/employees-list/employees-list.component';
import { ApplicationUserComponent } from './admin/components/users/application-user/application-user.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PageNotFoundComponent,
    PersonalDetailsComponent,
    ChangePasswordComponent,
    ProjectsComponent,
    ApplicationUserComponent
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
    MatDialogModule,
    NgxSmartModalModule.forRoot(),
  ],
  entryComponents : [EmployeesListComponent],
  providers: [EmployeesService,DepartmentsService,CustomersService,MeetingsService,TasksService,ProjectsService,LeaveService,TicketsService,AdministratorsService,ApplicationUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
