import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LeadManagementService {

  constructor(private HttpClient:HttpClient) { }

  addLeads(payload:any){
   return this.HttpClient.post(`${environment.base_url}/_leadManagementRoute/createLead`,payload)
  }
  getLeads(){
   return this.HttpClient.get(`${environment.base_url}/_leadManagementRoute/getLeadData`)
  }
  getLeadIdData(Id:any){
   return this.HttpClient.get(`${environment.base_url}/_leadManagementRoute/getLeadDataWithId/${Id}`)
  }
  deleteLeadIdData(Id:any){
   return this.HttpClient.delete(`${environment.base_url}/_leadManagementRoute/deleteLeadDataWithId/${Id}`)
  }
  updateLeadFormData(payLoad:any){
   return this.HttpClient.post(`${environment.base_url}/_leadManagementRoute/updateLeadForm`,payLoad)
  }
  softDeleteLeadIdData(Id:any) {
    return this.HttpClient.delete(`${environment.base_url}/_leadManagementRoute/softdeleteLeadDataWithId/${Id}`);
  };
  sendCompliancePackThroughEmail(payLoad:any){
   return this.HttpClient.post(`${environment.base_url}/_leadManagementRoute/sendCompliancePackToClient`,payLoad)
  }
}
