import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RawLeadService {

  constructor(private httpClient: HttpClient) {}





  uploadRawLeads(formData: any) {
   
    return this.httpClient.post(`${environment.base_url}/rawLeadManagement/uploadRawLeads`, formData);
  }



  createRawLeads(payload:any) {
   
    return this.httpClient.post(`${environment.base_url}/rawLeadManagement/createRawLead`, payload);
  }



  getAllLeads(){
    return this.httpClient.get(`${environment.base_url}/rawLeadManagement/getAllRawLeads`);

  }

  getRandomLead(){
    return this.httpClient.get(`${environment.base_url}/rawLeadManagement/getRandomRawLead`);
  }

  changeStatus(id:any,status:any){
    const payload = {
      status: status
    }
    return this.httpClient.patch(`${environment.base_url}/rawLeadManagement/updateRawLead/${id}`, payload);
  }


  getDelayedLead(){
    return this.httpClient.get(`${environment.base_url}/rawLeadManagement/getDelayedLead`);
  }
}
