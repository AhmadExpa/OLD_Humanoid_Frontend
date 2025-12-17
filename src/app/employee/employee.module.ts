import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { DashboardComponent } from './employee-components/dashboard/dashboard.component';
import { RawLeadComponent } from './employee-components/raw-lead/raw-lead.component';

import {MatInput, MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    EmployeeComponent,
    DashboardComponent,
    RawLeadComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
   FormsModule,
   ReactiveFormsModule,
    // StepperModule
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    TagModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    ButtonModule
  ]
})
export class EmployeeModule { }
