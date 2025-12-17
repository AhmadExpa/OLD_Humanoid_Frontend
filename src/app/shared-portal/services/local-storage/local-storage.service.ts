import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  getToken(){
    return localStorage.getItem('Access-Token');
  }
}
