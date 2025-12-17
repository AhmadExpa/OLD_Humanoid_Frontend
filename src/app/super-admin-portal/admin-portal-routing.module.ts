import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPortalComponent } from './admin-portal.component';
import { BdMeetingsComponent } from './components/bd-meetings/bd-meetings.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AbcComponent } from './components/dashboard/dashboard-coponents/abc/abc.component';
import { DashboardChartsComponent } from './components/dashboard/dashboard-coponents/dashboard-charts/dashboard-charts.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-coponents/dashboard-home/dashboard-home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndividualContactInformationComponent } from './components/individual-contact-information/individual-contact-information.component';
import { LeadsComponent } from './components/leads/leads.component';
import { CompaniesComponent } from './components/more-apps/more-apps-components/companies/companies.component';
import { PaySlipComponent } from './components/more-apps/more-apps-components/pay-slip/pay-slip.component';
import { TimeSheetReportComponent } from './components/more-apps/more-apps-components/time-sheet-report/time-sheet-report.component';
import { TimeSheetComponent } from './components/more-apps/more-apps-components/time-sheet/time-sheet.component';
import { MoreAppsComponent } from './components/more-apps/more-apps.component';
import { PipelinesComponent } from './components/pipelines/pipelines.component';
import { ProductsComponent } from './components/products/products.component';
import { RefereesComponent } from './components/referees/referees.component';
import { AgencyComponent } from './components/agency/agency.component';
import { RoleSystemComponent } from './components/role-system/role-system.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { CreateCompaniesComponent } from './components/create-companies/create-companies.component';
import { UserComponent } from './components/user/user.component';
import { RawLeadsComponent } from './components/raw-leads/raw-leads.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AssignTaskComponent } from './components/assign-task/assign-task.component';
import { EmployeesComponent } from './components/payroll/payroll-components/employees/employees.component';
import { PayCalendarComponent } from './components/payroll/payroll-components/pay-runs/pay-calendar/pay-calendar.component';
import { PayRunsComponent } from './components/payroll/payroll-components/pay-runs/pay-runs.component';
import { EmployeeNetPayComponent } from './components/payroll/payroll-components/reporting/reporting-dropdown/employee-net-pay/employee-net-pay.component';
import { EmployeerCostComponent } from './components/payroll/payroll-components/reporting/reporting-dropdown/employeer-cost/employeer-cost.component';
import { LiabilityTotalsComponent } from './components/payroll/payroll-components/reporting/reporting-dropdown/liability-totals/liability-totals.component';
import { PayslipSummaryComponent } from './components/payroll/payroll-components/reporting/reporting-dropdown/payslip-summary/payslip-summary.component';
import { ReportingComponent } from './components/payroll/payroll-components/reporting/reporting.component';
import { SettingsComponent } from './components/payroll/payroll-components/settings/settings.component';
import { SummaryComponent } from './components/payroll/payroll-components/summary/summary.component';
import { YearEndComponent } from './components/payroll/payroll-components/year-end/year-end.component';
import { PayrollComponent } from './components/payroll/payroll.component';
import { PayeSlipsComponent } from './components/paye-slips/paye-slips.component';
import { PayeTimelineComponent } from './components/paye-slips/Sub-Components/paye-timeline/paye-timeline.component';
import { PayePayslipComponent } from './components/paye-slips/Sub-Components/paye-payslip/paye-payslip.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPortalComponent,
    children: [
      {
        path: 'admin-dashboard',
        component: DashboardComponent,
        children: [
          { path: '', component: DashboardHomeComponent },
          { path: 'dashboard-home', component: DashboardHomeComponent },
          { path: 'dashboard-charts', component: DashboardChartsComponent },
          { path: 'dashboard-users', component: AbcComponent },
        ],
      },
      { path: 'leads', component: LeadsComponent },
      { path: 'raw-leads', component: RawLeadsComponent },

      { path: 'contacts', component: ContactsComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'users', component: UserComponent },
      { path: 'admin-profile', component: AdminProfileComponent },
      { path: 'create-company', component: CreateCompaniesComponent },
      {
        path: 'agency',
        component: AgencyComponent,
      },
      { path: 'pipeline', component: PipelinesComponent },
      { path: 'referees', component: RefereesComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'bd-meetings', component: BdMeetingsComponent },
      {
        path: 'individual-contact-information',
        component: IndividualContactInformationComponent,
      },
      { path: 'role-system', component: RoleSystemComponent },
      { path: 'create-user', component: CreateUserComponent },
      { path: 'assign-task', component: AssignTaskComponent },
      {
        path: 'more-apps',
        component: MoreAppsComponent,
        children: [
          {
            path: 'pay-slip/:Id',
            component: PaySlipComponent,
            children: [
              { path: 'time-sheet/:Id', component: TimeSheetComponent },
              {
                path: 'time-sheet-report',
                component: TimeSheetReportComponent,
              },
              { path: 'companies', component: CompaniesComponent },
            ],
          },
        ],
      },

      {
        path: 'payroll',
        component: PayrollComponent,
        children: [
          { path: '', component: SummaryComponent },
          { path: 'summary', component: SummaryComponent },
          { path: 'pay-runs', component: PayRunsComponent },
          { path: 'pay-calendar', component: PayCalendarComponent },
          { path: 'employee', component: EmployeesComponent },
          { path: 'year-end', component: YearEndComponent },
          { path: 'reporting', component: ReportingComponent },
          { path: 'employee-net-pay', component: EmployeeNetPayComponent },
          { path: 'employee-cost', component: EmployeerCostComponent },
          { path: 'liability-totals', component: LiabilityTotalsComponent },
          { path: 'payslip-summary', component: PayslipSummaryComponent },
          { path: 'settings', component: SettingsComponent },
        ],
      },
      {
        path: 'paye-slips',
        component: PayeSlipsComponent,
        children: [
          { path: '', component: PayePayslipComponent },
          { path: 'paye-payeslips', component: PayePayslipComponent },
          { path: 'paye-timeline', component: PayeTimelineComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPortalRoutingModule {}
