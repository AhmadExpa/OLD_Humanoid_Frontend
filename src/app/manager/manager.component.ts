import { Component } from '@angular/core';
import { LoginService } from '../shared-portal/services/login-api/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  public hideSidebar: boolean = false;

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
  ){
}



  signOut() {
    this.loginService.deleteLoginTokenFromLocalStorage()
    this.router.navigate(['./main-portal/home'])
  }
}
