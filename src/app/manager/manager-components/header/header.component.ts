import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public showSidebar: boolean = false;
  public isOpen: boolean = false; // this is cross line animation logic
  
  // 1st step is give output to parent component and output is boolean 
  @Output() showSidebarEvent = new EventEmitter<boolean>()
  
  
  constructor() {
    
  }


  expandSidebar(){
    this.isOpen = !this.isOpen;
    this.showSidebar = !this.showSidebar
    this.showSidebarEvent.emit(this.showSidebar) 
  }
}
