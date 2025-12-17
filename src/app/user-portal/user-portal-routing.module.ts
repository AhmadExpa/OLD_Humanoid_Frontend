import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPortalComponent } from './user-portal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-components/dashboard-home/dashboard-home.component';
import { DashboardChartsComponent } from './components/dashboard/dashboard-components/dashboard-charts/dashboard-charts.component';
import { AbcComponent } from './components/dashboard/dashboard-components/abc/abc.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AgencyComponent } from './components/agency/agency.component';
import { PipeLinesComponent } from './components/pipe-lines/pipe-lines.component';
import { RefreesComponent } from './components/refrees/refrees.component';
import { ProductsComponent } from './components/products/products.component';
import { BdMeetingsComponent } from './components/bd-meetings/bd-meetings.component';
import { IndividualContactInformationComponent } from './components/individual-contact-information/individual-contact-information.component';
import { MoreAppsComponent } from './components/more-apps/more-apps.component';
import { PayslipComponent } from './components/more-apps/more-apps-components/payslip/payslip.component';
import { TimesheetComponent } from './components/more-apps/more-apps-components/timesheet/timesheet.component';
import { TimeSheetReportComponent } from './components/more-apps/more-apps-components/time-sheet-report/time-sheet-report.component';
import { CompaniesComponent } from './components/more-apps/more-apps-components/companies/companies.component';
import { LeadsComponent } from './components/leads/leads.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';




const routes: Routes = [
  {
    path: '', component: UserPortalComponent,
    children: [
      {
        path: 'user-dashboard', component: DashboardComponent, children: [
          { path: '', component: DashboardHomeComponent },
          { path: 'dashboard-home', component: DashboardHomeComponent },
          { path: 'dashboard-charts', component: DashboardChartsComponent },
          { path: 'dashboard-users', component: AbcComponent }
        ]
      },
      {
        path: 'leads', component: LeadsComponent
      },

      {
        path: 'contacts', component: ContactsComponent

      },
      {
        path: 'clients', component: ClientsComponent
      },

      {
        path: 'userProfile', component: UserProfileComponent
      },

      {
        path: 'agency', component: AgencyComponent
      },
      { path: 'pipeline', component: PipeLinesComponent },
      { path: 'referees', component: RefreesComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'bd-meetings', component: BdMeetingsComponent },
      { path: 'individual-contact-information', component: IndividualContactInformationComponent },
      {
        path: 'more-apps', component: MoreAppsComponent, children: [
          {
            path: 'pay-slip', component: PayslipComponent, children: [
              { path: 'time-sheet', component: TimesheetComponent },
              { path: 'time-sheet-report', component: TimeSheetReportComponent },
              { path: 'companies', component: CompaniesComponent },
            ]
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPortalRoutingModule { }
