import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-main-portal',
  templateUrl: './main-portal.component.html',
  styleUrls: ['./main-portal.component.css']
})
export class MainPortalComponent {
  show: boolean = true;
  constructor(
    private readonly Router:Router
  ){
    Router.events.forEach((event:any) => {
      if (event instanceof NavigationEnd) {
        this.show = !event.url.startsWith("/registerThroughEmail/")
         && !event.url.startsWith("/signContract/") 
         && !event.url.startsWith("/submitSignContractPage");
      }
    });
  }

}
