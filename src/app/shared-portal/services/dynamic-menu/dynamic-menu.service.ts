import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicMenuService {

  public readonly menu = [
    {
      title: 'Dashboard',
      routerLink: './admin-dashboard',
      routerLinkActive: 'active',
      allow: true,
      icon: 'fa-solid fa-house'
    },
    {
      title: 'Clients',
      routerLink: './clients',
      routerLinkActive: 'active',
      allow: true,
      icon: 'fa-solid fa-users'
    },
    {
      title: 'Leads',
      routerLink: './leads',
      routerLinkActive: 'active',
      allow: true,
      icon: 'fa-solid fa-headset'
    },
    {
      title: 'Raw Leads',
      routerLink: './raw-leads',
      routerLinkActive: 'active',
      allow: true,
      icon: 'fa-solid fa-headset'
    },
    {
      title: 'Contacts',
      routerLink: './contacts',
      routerLinkActive: 'active',
      allow: true,
      icon: 'fa-solid fa-address-book'
    },
    {
      title: 'Agency',
      routerLink: './agency',
      routerLinkActive: 'active',
      allow: true,
      icon: 'fa-solid fa-user-tag'
    },
    {
      title: 'Settings',
      routerLink: './role-system',
      routerLinkActive: 'active',
      allow: true,
      icon: 'fa-solid fa-gear'
    },

    {
      title: 'companies',
      routerLink: './create-company',
      routerLinkActive: 'active',
      allow: true,
      icon: 'fa-solid fa-building'
    },
    {
      title:'Users',
      routerLink:'./users',
      routerLinkActive:'active',
      allow:true,
      icon:'fa-solid fa-users'
    },
    {
      title:'Create User',
      routerLink:'./create-user',
      routerLinkActive:'active',
      allow:true,
      icon:'fa-solid fa-user'
    },
    {
      title:'Assign Task',
      routerLink:'./assign-task',
      routerLinkActive:'active',
      allow:true,
      icon:'fas fa-receipt'
    },
    {
      title:'Payroll',
      routerLink:'./payroll',
      routerLinkActive:'active',
      allow:true,
      icon:'fas fa-dollar-sign'
    },  
    {
      title: 'PAYE',
      routerLink: './paye-slips',
      routerLinkActive: 'active',
      allow: true,
      icon: 'fas fa-file-invoice-dollar'
    },
    {
      title:'More Apps',
      routerLink:'./more-apps',
      routerLinkActive:'active',
      allow:true,
      icon:'fas fa-ellipsis-h'
    }
  ]

  public readonly userMenu = [
    {
      title: 'Dashboard',
      routerLink: './user-dashboard',
      routerLinkActive: 'active',
      allow: true,
      icon: 'fa-solid fa-house'
    },
    {
      title: 'Clients',
      routerLink: './clients',
      routerLinkActive: 'active',
      allow: true,
      icon: 'fa-solid fa-users'
    },
    {
      title: 'Leads',
      routerLink: './leads',
      routerLinkActive: 'active',
      allow: true,
      icon: 'fa-solid fa-headset'
    },
    {
      title: 'Contacts',
      routerLink: './contacts',
      routerLinkActive: 'active',
      allow: true,
      icon: 'fa-solid fa-address-book'
    },
    {
      title: 'Agency',
      routerLink: './agency',
      routerLinkActive: 'active',
      allow: true,
      icon: 'fa-solid fa-user-tag'
    },
    {
      title: 'Settings',
      routerLink: './role-system',
      routerLinkActive: 'active',
      allow: true,
      icon: 'fa-solid fa-gear'
    },
    {
      title: 'More Apps',
      routerLink: './more-apps',
      routerLinkActive: 'active',
      allow: true,
      icon: 'fas fa-ellipsis-h'
    }
  ]

  constructor() { }

  public getMenu() {
    return this.menu;
  }

  public getUserMenu() {
    return this.userMenu;
  }
}
