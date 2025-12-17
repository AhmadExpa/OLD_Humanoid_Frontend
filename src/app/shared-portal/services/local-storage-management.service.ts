import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagementService {

  constructor() { }
  
  public getUserRole():any{
    const {role} = JSON.parse(localStorage.getItem('user-data') || '')
    return role === 'admin';
  }
}
