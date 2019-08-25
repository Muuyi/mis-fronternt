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
      {path:'tasks',component:TasksListComponent}
    ]
  },
  {path:'**', component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,AdminComponent,PersonalDetailsComponent,ChangePasswordComponent,EmployeesListComponent,SystemUsersComponent,PageNotFoundComponent,CustomersListComponent,MeetingsComponent,TasksListComponent]
