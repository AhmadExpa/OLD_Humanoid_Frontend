import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PaySlipManagementService {

  constructor(
    private readonly HttpClient:HttpClient
  ) { }

  addPaySlip(PayLoad:any){
    return this.HttpClient.post(`${environment.base_url}/paySlipManagement/addPaySlip`,PayLoad);
  }

  getAllPaySlip(){
    return this.HttpClient.get(`${environment.base_url}/paySlipManagement/getAllPaySlip`);
  }
  
  getPaySlipById(Id:any){
    return this.HttpClient.get(`${environment.base_url}/paySlipManagement/getPaySlipById/${Id}`);
  }

  deleteAllPaySlip(){
    return this.HttpClient.delete(`${environment.base_url}/paySlipManagement/deleteAllPaySlip`);
  }

  deletePaySlipById(Id:any){
    return this.HttpClient.delete(`${environment.base_url}/paySlipManagement/deletePaySlipById/${Id}`);
  }

  weekExists(payLoad:any){
   return this.HttpClient.post(`${environment.base_url}/paySlipManagement/weekExists`,payLoad)
  }

  sendEmailToClient(payLoad:any){
    return this.HttpClient.post(`${environment.base_url}/paySlipManagement/sendEmailToClient`,payLoad)
  }

  deleteParticularField(payLoad:any){
    return this.HttpClient.post(`${environment.base_url}/paySlipManagement/deleteParticularField`,payLoad)
  }

  updatePaySlipDataById(payLoad:any){
    return this.HttpClient.post(`/paySlipManagement/updatePaySlipDataById/`, payLoad)
  }

}
