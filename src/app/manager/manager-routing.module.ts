import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { DashboardComponent } from './manager-components/dashboard/dashboard.component';

const routes: Routes = [{ path: '', component: ManagerComponent,
  children:[
    {path:'' , component:DashboardComponent},
    {path:'Dashboard' , component:DashboardComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
