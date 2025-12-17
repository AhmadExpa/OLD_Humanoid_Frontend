import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClientManagementService {

  constructor(
    private HttpClient:HttpClient
  ) {
   }

  addClients(PayLoad:any){
    return this.HttpClient.post(`${environment.base_url}/clientManagement/clientData`, PayLoad);
  }

  getAllClients(){
    return this.HttpClient.get(`${environment.base_url}/clientManagement/getAllClientData`);
  }

  getClientById(Id:any){
    return this.HttpClient.get(`${environment.base_url}/clientManagement/getClientDataById/${Id}`);
  }

  softDeleteClientById(Id:any){
    return this.HttpClient.delete(`${environment.base_url}/clientManagement/softDeleteClientDataById/${Id}`);
  }

  hardDeleteClientById(Id:any){
    return this.HttpClient.delete(`${environment.base_url}/clientManagement/hardDeleteClientDataById/${Id}`);
  }

  updateClientById(payLoad:any){
    return this.HttpClient.post(`${environment.base_url}/clientManagement/updateClientDataById/`, payLoad)
  }

  deleteAllClients(){

  }

    addBulkClients(){

  }

  getBulkClients(){

  }

  getBlukClientById(){

  }

  deleteAllBulkClients(){

  }

  deleteBulkClientById(){

  }

  
}



//Checking te gpg