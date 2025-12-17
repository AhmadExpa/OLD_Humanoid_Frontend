import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPortalRoutingModule } from './user-portal-routing.module';
import { UserPortalComponent } from './user-portal.component';
import { AgencyComponent } from './components/agency/agency.component';
import { BdMeetingsComponent } from './components/bd-meetings/bd-meetings.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndividualContactInformationComponent } from './components/individual-contact-information/individual-contact-information.component';
import { MoreAppsComponent } from './components/more-apps/more-apps.component';
import { PipeLinesComponent } from './components/pipe-lines/pipe-lines.component';
import { ProductsComponent } from './components/products/products.component';
import { RefreesComponent } from './components/refrees/refrees.component';
import { CompaniesComponent } from './components/more-apps/more-apps-components/companies/companies.component';
import { PayslipComponent } from './components/more-apps/more-apps-components/payslip/payslip.component';
import { TimesheetComponent } from './components/more-apps/more-apps-components/timesheet/timesheet.component';
import { TimeSheetReportComponent } from './components/more-apps/more-apps-components/time-sheet-report/time-sheet-report.component';
import { DashboardChartsComponent } from './components/dashboard/dashboard-components/dashboard-charts/dashboard-charts.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-components/dashboard-home/dashboard-home.component';
import { AbcComponent } from './components/dashboard/dashboard-components/abc/abc.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { NgxPrintModule } from 'ngx-print';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { LeadsComponent } from './components/leads/leads.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


@NgModule({
  declarations: [
    UserPortalComponent,
    AgencyComponent,
    BdMeetingsComponent,
    ClientsComponent,
    ContactsComponent,
    DashboardComponent,
    IndividualContactInformationComponent,
    MoreAppsComponent,
    PipeLinesComponent,
    ProductsComponent,
    RefreesComponent,
    CompaniesComponent,
    PayslipComponent,
    TimesheetComponent,
    TimeSheetReportComponent,
    DashboardChartsComponent,
    DashboardHomeComponent,
    AbcComponent,
    LeadsComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserPortalRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextareaModule,
    TableModule,
    PaginatorModule,
    TagModule,
    MultiSelectModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    InputTextareaModule,
    InputTextModule,
    TabMenuModule,
    NgxPrintModule,
    SplitButtonModule,
    NgChartsModule
  ]
})
export class UserPortalModule { }
