import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() sidebarStatus: boolean = false;
  public sideBarMenu:any[]=[
    {
      name:'Home',
      link:'Dashboard',
      icon:'fa-solid fa-house'
    },
    {
      name:'About',
      link:'Test',
      icon:'fa-solid fa-sliders'
    },
    {
      name:'Products',
      link:'product',
      icon:'fa-solid fa-address-book'
    }
  ]
}
