import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { DashboardComponent } from './employee-components/dashboard/dashboard.component';
import { RawLeadComponent } from './employee-components/raw-lead/raw-lead.component';

const routes: Routes = [{ path: '', component: EmployeeComponent,
  children:[
    {path:'' , component:DashboardComponent},
    {path:'dashboard' , component:DashboardComponent},
    {path:'rawLead' , component:RawLeadComponent}, 
  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
