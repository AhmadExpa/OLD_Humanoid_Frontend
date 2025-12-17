import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../shared-portal/services/login-api/login.service';
import { MegaMenuItem } from 'primeng/api';
import { DynamicMenuService } from 'src/app/shared-portal/services/dynamic-menu/dynamic-menu.service';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {

  showDropDown: Boolean = false;
  public isRotated: boolean = false;
  public isClosed: boolean = false;
  public userName: string | any;
  public userRole: string | any;
  public menuList: any = [];


  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly DynamicMenuService: DynamicMenuService,
  ) { }

  ngOnInit(): void {
    this.menuList = this.DynamicMenuService.getMenu();
    const userData = this.loginService.getUserData();
    this.userName = userData ? userData.firstName : '';
    this.userRole = userData ? userData.role : '';
    this.checkScreenWidth();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  private checkScreenWidth(): void {
  
    const screenWidth = window.innerWidth;
    
      if (screenWidth <= 767) {
        this.isClosed = true;
      } else {
        this.isClosed = false;  
      }
    }

  toggleRotation() {
    this.isRotated = !this.isRotated;

  }
  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }

  activeDropdown() {
    this.showDropDown = !this.showDropDown;
  }

  signOut() {
    this.loginService.deleteLoginTokenFromLocalStorage()
    this.router.navigate(['./main-portal/home'])
  }




}

