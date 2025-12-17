import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  countTotalProfiles: any = 0;
  countTotalPendingRequests: any = 0;
  countTotalCompletedRequests: any = 0;
  totalExpiredProfiles: any = 0;
}
