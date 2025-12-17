import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared-portal/services/login-api/login.service';
import { DynamicMenuService } from '../shared-portal/services/dynamic-menu/dynamic-menu.service';

@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.css']
})
export class UserPortalComponent {

  public userData: any;
  // showDropDown: Boolean = false;
  public isRotated: boolean = false;
  public isClosed: boolean = false;
  public userName: string | any;
  public userRole: string | any;
  public Menu: any = [];

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly DynamicMenuService: DynamicMenuService
  ) { }

  ngOnInit(): void {
    const userData = this.loginService.getUserData();
    this.userName = userData ? userData.firstName : '';
    this.userRole = userData ? userData.role : '';
    this.Menu = this.DynamicMenuService.getUserMenu();
    this.userData = this.loginService.getUserData();
    this.checkScreenWidth();
    const {canAccess} =  this.userData;
    const filteredMenu = this.Menu.filter((menuItem:any) => {
      const userDataItem = canAccess.find((dataItem:any) => dataItem.title === menuItem.title);
      return userDataItem && userDataItem.allow;
    });
    this.Menu = filteredMenu
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
  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }

  // activeDropdown() {
  //   this.showDropDown = !this.showDropDown;
  // }

  signOut() {
    this.loginService.deleteLoginTokenFromLocalStorage()
    this.router.navigate(['./main-portal/home'])
  }




}