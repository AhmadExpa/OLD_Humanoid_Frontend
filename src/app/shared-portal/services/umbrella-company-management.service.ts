import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UmbrellaCompanyManagementService {

  constructor(private readonly HttpClient:HttpClient) { }

  sendUmbrellaCompanyForm(payLoad:any){
    return this.HttpClient.post(`${environment.base_url}/umbrellaCompanyManagement/createUmbrellaCompany`,payLoad)
  }

  getUmbrellaCompanyFormData(){
    return this.HttpClient.get(`${environment.base_url}/umbrellaCompanyManagement/getUmbrellaCompany`)
  }

  public deleteUmbrellaCompany(_id:any){
    return this.HttpClient.delete(`${environment.base_url}/umbrellaCompanyManagement/deleteUmbrellaCompany/${_id}`);
  }

}
