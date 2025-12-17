import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent {
  countTotalProfiles: any = 0;
  countTotalPendingRequests: any = 0;
  countTotalCompletedRequests: any = 0;
  totalExpiredProfiles: any = 0;
}
