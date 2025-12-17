import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPortalRoutingModule } from './admin-portal-routing.module';
import { AdminPortalComponent } from './admin-portal.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { BdMeetingsComponent } from './components/bd-meetings/bd-meetings.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndividualContactInformationComponent } from './components/individual-contact-information/individual-contact-information.component';
import { LeadsComponent } from './components/leads/leads.component';
import { PipelinesComponent } from './components/pipelines/pipelines.component';
import { ProductsComponent } from './components/products/products.component';
import { RefereesComponent } from './components/referees/referees.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AbcComponent } from './components/dashboard/dashboard-coponents/abc/abc.component';
import { DashboardChartsComponent } from './components/dashboard/dashboard-coponents/dashboard-charts/dashboard-charts.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-coponents/dashboard-home/dashboard-home.component';
import { NgChartsModule } from 'ng2-charts';
import { MoreAppsComponent } from './components/more-apps/more-apps.component';
import { PaySlipComponent } from './components/more-apps/more-apps-components/pay-slip/pay-slip.component';
import { TimeSheetComponent } from './components/more-apps/more-apps-components/time-sheet/time-sheet.component';
import { TimeSheetReportComponent } from './components/more-apps/more-apps-components/time-sheet-report/time-sheet-report.component';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { NgxPrintModule } from 'ngx-print';
import { CompaniesComponent } from './components/more-apps/more-apps-components/companies/companies.component';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AgencyComponent } from './components/agency/agency.component';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccordionModule } from 'primeng/accordion';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RoleSystemComponent } from './components/role-system/role-system.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { ProgressBarModule } from 'primeng/progressbar';
import { MenubarModule } from 'primeng/menubar';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { CreateCompaniesComponent } from './components/create-companies/create-companies.component';
import { UserComponent } from './components/user/user.component';
import { PayrollComponent } from './components/payroll/payroll.component';
import { EmployeesComponent } from './components/payroll/payroll-components/employees/employees.component';
import { PayRunsComponent } from './components/payroll/payroll-components/pay-runs/pay-runs.component';
import { CreateEmployeeComponent } from './components/payroll/payroll-components/employees/create-employee/create-employee.component';
import { PayCalendarComponent } from './components/payroll/payroll-components/pay-runs/pay-calendar/pay-calendar.component';
import { PayrollNavComponent } from './components/payroll/payroll-components/payroll-nav/payroll-nav.component';
import { ReportingComponent } from './components/payroll/payroll-components/reporting/reporting.component';
import { ReportingDropdownComponent } from './components/payroll/payroll-components/reporting/reporting-dropdown/reporting-dropdown.component';
import { EmployeeNetPayComponent } from './components/payroll/payroll-components/reporting/reporting-dropdown/employee-net-pay/employee-net-pay.component';
import { EmployeerCostComponent } from './components/payroll/payroll-components/reporting/reporting-dropdown/employeer-cost/employeer-cost.component';
import { LiabilityTotalsComponent } from './components/payroll/payroll-components/reporting/reporting-dropdown/liability-totals/liability-totals.component';
import { PayslipSummaryComponent } from './components/payroll/payroll-components/reporting/reporting-dropdown/payslip-summary/payslip-summary.component';
import { SettingsComponent } from './components/payroll/payroll-components/settings/settings.component';
import { SummaryComponent } from './components/payroll/payroll-components/summary/summary.component';
import { YearEndComponent } from './components/payroll/payroll-components/year-end/year-end.component';
import { ValidationErrorsComponent } from './components/validation-errors/validation-errors.component';
import { ToastModule } from 'primeng/toast';
import { RawLeadsComponent } from './components/raw-leads/raw-leads.component';
import { AssignTaskComponent } from './components/assign-task/assign-task.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CreateUserRoleComponent } from './components/create-user/create-user-role/create-user-role.component';
import { PayeSlipsComponent } from './components/paye-slips/paye-slips.component';
import { PayeTimelineComponent } from './components/paye-slips/Sub-Components/paye-timeline/paye-timeline.component';
import { PayePayslipComponent } from './components/paye-slips/Sub-Components/paye-payslip/paye-payslip.component';

@NgModule({
  declarations: [
    AdminPortalComponent,
    AdminHeaderComponent,
    BdMeetingsComponent,
    ClientsComponent,
    ContactsComponent,
    DashboardComponent,
    IndividualContactInformationComponent,
    LeadsComponent,
    PipelinesComponent,
    ProductsComponent,
    RefereesComponent,
    AbcComponent,
    DashboardChartsComponent,
    DashboardHomeComponent,
    MoreAppsComponent,
    PaySlipComponent,
    TimeSheetComponent,
    TimeSheetReportComponent,
    CompaniesComponent,
    AgencyComponent,
    RoleSystemComponent,
    AdminProfileComponent,
    CreateCompaniesComponent,
    UserComponent,
    PayrollComponent,
    EmployeesComponent,
    PayRunsComponent,
    CreateEmployeeComponent,
    PayCalendarComponent,
    PayrollNavComponent,
    ReportingComponent,
    ReportingDropdownComponent,
    EmployeeNetPayComponent,
    EmployeerCostComponent,
    LiabilityTotalsComponent,
    PayslipSummaryComponent,
    SettingsComponent,
    SummaryComponent,
    YearEndComponent,
    ValidationErrorsComponent,
    RawLeadsComponent,
    AssignTaskComponent,
    CreateUserComponent,
    CreateUserRoleComponent,
    PayeSlipsComponent,
    PayeTimelineComponent,
    PayePayslipComponent,

  ],
  imports: [
    CommonModule,
    AdminPortalRoutingModule,
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
    NgChartsModule,
    MegaMenuModule,
    TooltipModule,
    MenuModule,
    MenubarModule,
    CheckboxModule,
    CalendarModule,
    AccordionModule,
    RadioButtonModule,
    FileUploadModule,
    ProgressBarModule,
    ToastModule

  ]
})
export class AdminPortalModule { }
