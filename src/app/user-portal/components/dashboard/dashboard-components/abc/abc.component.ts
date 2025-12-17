import { Component } from '@angular/core';
import { clientModel } from 'src/app/shared-portal/models/clientModel';

@Component({
  selector: 'app-abc',
  templateUrl: './abc.component.html',
  styleUrls: ['./abc.component.css']
})
export class AbcComponent {
  public tableStyle = {'min-width': '50rem'};
  public rowsPerPageOptions = [8,16,24];
  start: number = 1;
  rowData: clientModel[] = [
    
  ] || [];

  countTotalProfiles: any = 0;
  countTotalPendingRequests: any = 0;
  countTotalCompletedRequests: any = 0;
  totalExpiredProfiles: any = 0;

  constructor() { 
  }

  ngOnInit(): void {
  }

  public getClientIndiviualData(data:clientModel){
    data
  }
}
