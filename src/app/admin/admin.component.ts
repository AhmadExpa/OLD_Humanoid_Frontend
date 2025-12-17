import { Component } from '@angular/core';
import { LoginService } from '../shared-portal/services/login-api/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  public isClosed: boolean = false;

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
  ){
}

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }


  signOut() {
    this.loginService.deleteLoginTokenFromLocalStorage()
    this.router.navigate(['./main-portal/home'])
  }
}
