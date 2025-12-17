import { Component } from '@angular/core';
import { PayrollService } from 'src/app/shared-portal/services/payroll-management/payroll.service';

@Component({
  selector: 'app-pay-runs',
  templateUrl: './pay-runs.component.html',
  styleUrls: ['./pay-runs.component.css']
})
export class PayRunsComponent {
  payCalender : any = []
  weeklyCalendars:any = []
  two_weeklyCalendar:any = []
  four_weeklyCalendar:any = []
  monthly_Calendar:any = []
  constructor(private readonly payrollService:PayrollService){
  }

 ngOnInit(){
  this.getAllPayCalendar();
  this.getAllMonthlyCalender()
 }

 

 //get All Pay Calendar
getAllPayCalendar(){
  this.payCalender = this.payrollService.getAllPayCalendar().subscribe((res:any)=>{
    this.weeklyCalendars = res.result
    // if(res.result){
    //    this.weeklyCalendars = res.result.filter((item:any)=> item.calenderType === 'weekly')
    //    this.two_weeklyCalendar = res.result.filter((item:any)=> item.calenderType === '2-weekly')
    //    this.four_weeklyCalendar = res.result.filter((item:any)=> item.calenderType === '4-weekly')
    // }
  })
}


//get All Monthly Calendar
getAllMonthlyCalender(){
  this.payrollService.getAllMonthlyCalendar().subscribe((res:any)=>{
    this.monthly_Calendar = res.result
  })
}
}
