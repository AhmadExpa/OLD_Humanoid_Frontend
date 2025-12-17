import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userSubject: BehaviorSubject <any> | any;
  constructor(
    private HttpClient:HttpClient,
    
  ) { }

  public get userValue(){
    return this.userSubject;
  }
  
  createLoginForm(payLoad:any){
    return this.HttpClient.post(`${environment.base_url}/adminmanagement/adminLogin`,payLoad);
  }

  saveLoginTokenToLocalStorage(Payload:any){
     localStorage.setItem('Access-Token',Payload.token);
     localStorage.setItem('user-data',JSON.stringify(Payload.userData));
   } 

   ifUserLogin(){
    return localStorage.getItem('Access-Token') !== null;
  }

  deleteLoginTokenFromLocalStorage(){
    localStorage.clear();
  }

  registerUser(payLoad:any){
    return this.HttpClient.post(`${environment.base_url}/adminmanagement/adminRegister`,payLoad)
  }

  getUserData(){
    return JSON.parse(localStorage.getItem('user-data') || '')
  }

}
