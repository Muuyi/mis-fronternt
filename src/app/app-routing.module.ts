import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PersonalDetailsComponent } from './admin/components/users/personal-details/personal-details.component';
import { ChangePasswordComponent } from './admin/components/users/change-password/change-password.component';
import { EmployeesListComponent } from './admin/components/users/employees-list/employees-list.component';
import { SystemUsersComponent } from './admin/components/users/system-users/system-users.component';
import { CustomersListComponent } from './admin/components/users/customers-list/customers-list.component';
import { MeetingsComponent } from './admin/components/meetings/meetings.component';
import { TasksListComponent } from './admin/components/tasks/tasks-list/tasks-list.component';
import { ProjectsComponent } from './admin/components/projects/projects/projects.component';
import { LeaveComponent } from './admin/components/leave/leave/leave.component';
import { TicketsComponent } from './admin/components/tickets/tickets/tickets.component';
import { ApplicationUserComponent } from './admin/components/users/application-user/application-user.component';
import { AuthGuard } from './auth/auth.guard';
import { TasksProgressComponent } from './admin/components/tasks/tasks-progress/tasks-progress.component';
import { ProjectsProgressComponent } from './admin/components/projects/projects-progress/projects-progress.component';
import { TicketsProgressComponent } from './admin/components/tickets/tickets-progress/tickets-progress.component';
import { DepartmentsComponent } from './admin/components/users/departments/departments.component';
import { LeavelistComponent } from './admin/components/leave/leavelist/leavelist.component';
import { MeetingsAttendanceComponent } from './admin/components/meetings/meetings-attendance/meetings-attendance.component';
import { MeetingsProgressComponent } from './admin/components/meetings/meetings-progress/meetings-progress.component';
import { MeetingsDetailsComponent } from './admin/components/meetings/meetings-details/meetings-details.component';


const routes: Routes = [
  {path:'', redirectTo:"/login", pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'admin', component:AdminComponent,
    children: [
      {path:'personal-details',component:PersonalDetailsComponent},
      {path:'change-password',component:ChangePasswordComponent},
      {path:'employees-list',component:EmployeesListComponent},
      {path:'system-users',component:SystemUsersComponent},
      {path:'customers-list',component:CustomersListComponent},
      {path:'meetings',component:MeetingsComponent},
      {path:'meetings-attendance',component:MeetingsAttendanceComponent},
      {path:'meeting-progress',component:MeetingsProgressComponent},
      {path:'meetings/meeting-details',component:MeetingsDetailsComponent},
      {path:'tasks',component:TasksListComponent},
      {path:'tasks-progress',component:TasksProgressComponent},
      {path:'projects',component:ProjectsComponent},
      {path:'projects-progress',component:ProjectsProgressComponent},
      {path:'leave',component:LeaveComponent},
      {path:'leavelist',component:LeavelistComponent},
      {path:'tickets',component:TicketsComponent},
      {path:'tickets-progress',component:TicketsProgressComponent},
      {path:'application-users',component:ApplicationUserComponent},
      {path:'departments',component:DepartmentsComponent}
    ]
    ,canActivate:[AuthGuard]
  },
  //  
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,AdminComponent,PersonalDetailsComponent,ChangePasswordComponent,EmployeesListComponent,SystemUsersComponent,PageNotFoundComponent,CustomersListComponent,MeetingsComponent,MeetingsProgressComponent,TasksListComponent,ProjectsComponent,LeaveComponent,LeavelistComponent,TicketsComponent,TicketsProgressComponent,MeetingsDetailsComponent]
