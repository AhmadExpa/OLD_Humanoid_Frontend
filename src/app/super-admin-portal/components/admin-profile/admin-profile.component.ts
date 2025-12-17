import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { LoginService } from 'src/app/shared-portal/services/login-api/login.service';
// import { LoginService } from 'src/app/shared-portal/services/login-api/login.service';
// import { LoginService } from 'src/app/shared-portal/services/login-api/login.service';


@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit{
  @ViewChild('piechart') piechart: any;
  public adminData:any ;
  public doughnutCanvas: any;
  public doughnutCtx: any;
  public userName: string | any;
  public userRole: string | any;
  
  constructor (
    private readonly LoginService: LoginService,
    ){
      
    }
    ngAfterViewInit(){
      this.doughnutCanvas = this.piechart.nativeElement;
      this.doughnutCtx = this.doughnutCanvas.getContext('2d');
      new Chart(this.doughnutCtx, {
        type: 'doughnut',
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              display: false,
            },
            title: {
              display: true,
              text: 'Admin-Progress',
              color: 'white',
              position: 'bottom',
            }
          }
        },
        data: {
          datasets: [{
            label: 'New Value',
            data: [50, 30, 20, ],
            backgroundColor: ["#5cc778", "#f8cc46", "#ec4969",],
            // borderColor: "#2CE713",
            // fill: true,
          },
          ],
          labels: ['January 2023', 'February 2023', 'March 2023',]
        },
      });
    }

ngOnInit(): void {
  this.adminInformation()
   const userData = this.LoginService.getUserData();
  this.userName = userData ? userData.firstName : '';
  this.userRole = userData ? userData.role : '';
}

adminInformation(){
const adminDataString = localStorage.getItem('user-data')

if (adminDataString){

  const  information = JSON.parse(adminDataString)
  this.adminData = [information]
  
  
}


}
}