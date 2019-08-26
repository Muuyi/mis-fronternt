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
import {FormsModule} from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PersonalDetailsComponent } from './admin/components/users/personal-details/personal-details.component';
import { ChangePasswordComponent } from './admin/components/users/change-password/change-password.component';
import { EmployeesService,DepartmentsService,UsersService,CustomersService, MeetingsService, TasksService, ProjectsService, LeaveService } from './shared/employees.service';
import { MeetingsComponent } from './admin/components/meetings/meetings.component';
import { TasksListComponent } from './admin/components/tasks/tasks-list/tasks-list.component';
import { ProjectsComponent } from './admin/components/projects/projects/projects.component';
import { TicketsComponent } from './admin/components/tickets/tickets/tickets.component';
import { LeaveComponent } from './admin/components/leave/leave/leave.component';
import { EmployeesListComponent } from './admin/components/users/employees-list/employees-list.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PageNotFoundComponent,
    PersonalDetailsComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
  providers: [EmployeesService,DepartmentsService,UsersService,CustomersService,MeetingsService,TasksService,ProjectsService,LeaveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
