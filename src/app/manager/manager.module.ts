import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { DashboardComponent } from './manager-components/dashboard/dashboard.component';
import { HeaderComponent } from './manager-components/header/header.component';
import { SidebarComponent } from './manager-components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    ManagerComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
