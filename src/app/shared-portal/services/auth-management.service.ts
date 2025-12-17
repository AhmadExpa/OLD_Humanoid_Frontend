import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthManagementService {
  
  private readonly Access_Token = 'ACCESS_TOKEN';

  constructor(
    private readonly Router:Router,
  ) { }

  public saveToken( token:string ):void {
    sessionStorage.setItem(this.Access_Token, token);
  }

  public getToken(): string | null {
    const token = sessionStorage.getItem(this.Access_Token) || null;
    return token;
  }

}
