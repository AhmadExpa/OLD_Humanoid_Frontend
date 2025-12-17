import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegistrationThroughEmailService {

  constructor(
    private readonly HttpClient: HttpClient
  ) { }

  registrationThroughEmailSaveAllData(payLoad: any) {
    return this.HttpClient.post(`${environment.base_url}/registrationThroughEmailManagement/registrationThroughEmailSaveAllData`, payLoad);
  };
  sendSignatureRequestThroughRegistration(payLoad: any) {
    return this.HttpClient.post(`${environment.base_url}/registrationThroughEmailManagement/sendSignatureRequestThroughRegistration`, payLoad);
  }

  registrationThroughEmailGetAllData() {
    return this.HttpClient.get(`${environment.base_url}/registrationThroughEmailManagement/registrationThroughEmailGetAllData`);
  };
  registrationThroughEmailGetIdData(Id:any) {
    return this.HttpClient.get(`${environment.base_url}/registrationThroughEmailManagement/registrationThroughEmailGetIdData/${Id}`);
  };
  registrationThroughEmailDeleteIdData(Id:any) {
    return this.HttpClient.delete(`${environment.base_url}/registrationThroughEmailManagement/registrationThroughEmailDeleteIdData/${Id}`);
  };
  registrationThroughEmailSoftDeleteIdData(Id:any) {
    return this.HttpClient.delete(`${environment.base_url}/registrationThroughEmailManagement/registrationThroughEmailSoftDeleteIdData/${Id}`);
  };

  registrationThroughEmailUpdataFormData(payLoad:any){
    return this.HttpClient.post(`${environment.base_url}/registrationThroughEmailManagement/registrationThroughEmailUpdataFormData`,payLoad)
   }

  sendSignedContract(payLoad:any){
    return this.HttpClient.post(`${environment.base_url}/registrationThroughEmailManagement/sendSignedContractByUser`,payLoad);
  }

}
