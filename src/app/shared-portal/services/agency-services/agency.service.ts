import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(
    private HttpClient:HttpClient
  ) {
   }

  addAgency(PayLoad:any){
    return this.HttpClient.post(`${environment.base_url}/AgencyManagementRoute/createAgencyData`, PayLoad);
  }

  getAllAgency(){
    return this.HttpClient.get(`${environment.base_url}/AgencyManagementRoute/getAllAgencyData`);
  }

  getAgencyById(Id:any){
    return this.HttpClient.get(`${environment.base_url}/AgencyManagementRoute/getAgencyDataById/${Id}`);
  }

  softDeleteAgencyById(Id:any){
    return this.HttpClient.delete(`${environment.base_url}/AgencyManagementRoute/softDeleteAgencyDataById/${Id}`);
  }

  hardDeleteAgencyById(Id:any){
    return this.HttpClient.delete(`${environment.base_url}/AgencyManagementRoute/hardDeleteAgencyDataById/${Id}`);
  }

  updateAgencyById(payLoad:any){
    return this.HttpClient.post(`${environment.base_url}/AgencyManagementRoute/updateAgencyDataById/`, payLoad)
  }

  // deleteAllClients(){

  // }

  //   addBulkClients(){

  // }

  // getBulkClients(){

  // }

  // getBlukClientById(){

  // }

  // deleteAllBulkClients(){

  // }

  // deleteBulkClientById(){

  // }
}
