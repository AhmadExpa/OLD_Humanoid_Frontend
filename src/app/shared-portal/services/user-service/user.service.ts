import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private HttpClient:HttpClient,
    
  ) { }

  getAllUsers(){
    return this.HttpClient.get(`${environment.base_url}/userManagement/getAllUserData`);
  }
  getUserById(Id:any){
    return this.HttpClient.get(`${environment.base_url}/userManagement/getUserDataById/${Id}`);
  }

  softDeleteUserById(Id:any){
    return this.HttpClient.delete(`${environment.base_url}/userManagement/softDeleteUserDataById/${Id}`);
  }

  hardDeleteUserById(Id:any){
    return this.HttpClient.delete(`${environment.base_url}/userManagement/hardDeleteUserDataById/${Id}`);
  }

  updateUserById(payLoad:any){
    return this.HttpClient.post(`${environment.base_url}/userManagement/updateUserDataById/`, payLoad)
  }
}
