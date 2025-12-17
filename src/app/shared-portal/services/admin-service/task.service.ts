import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly HttpClient:HttpClient) { }

  //create user role 
  createUserRole(data:any){
    return this.HttpClient.post(`${environment.base_url}/assignRole/createRole`,data)
  }

  //get user role 
  getUserRole(){
    return this.HttpClient.get(`${environment.base_url}/assignRole/getAllRole`)
  }

  //create user 
  createUser(data:any){
    return this.HttpClient.post(`${environment.base_url}/adminmanagement/adminRegister`,data)
  }

  //create User Task
  createAssignTask(data:any){
      return this.HttpClient.post(`${environment.base_url}/assignTask/createAssignTaskData`,data)
   }

  //get User Task
  getAllAssignTask(){
    return this.HttpClient.get(`${environment.base_url}/assignTask/getAllTask`)
   }
}
