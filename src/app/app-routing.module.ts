import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';


import { AddEmployeeComponent } from './Components/employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './Components/employee/edit-employee/edit-employee.component';
import { employeesComponent } from './Components/employee/employees/employees.component';
import { ViewEmployeeComponent } from './Components/employee/view-employee/view-employee.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'employee', component: employeesComponent },
  { path: 'employee/Add', component: AddEmployeeComponent },
  { path: 'employee/edit/:employeeId', component: EditEmployeeComponent },
  { path: 'employee/view/:employeeId', component: ViewEmployeeComponent },

  
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
