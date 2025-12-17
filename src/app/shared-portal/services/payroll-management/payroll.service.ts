import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  constructor(private HttpClient:HttpClient) { }

  addPayrollEmployee(payload:any){
    return this.HttpClient.post(`${environment.base_url}/payrollEmployee/createPayrollEmployee`,payload)
   }
   getPayrollEmployee(){
    return this.HttpClient.get(`${environment.base_url}/payrollEmployee/getPayrollEmployee`)
   }
   getPayrollEmployeeIdData(Id:any){
    return this.HttpClient.get(`${environment.base_url}/payrollEmployee/getPayrollEmployeeWithId/${Id}`)
   }
   deletePayrollEmployeeIdData(Id:any){
    return this.HttpClient.delete(`${environment.base_url}/payrollEmployee/deletePayrollEmployeeWithId/${Id}`)
   }

   updatePayrollEmployeeData(payLoad:any){
    return this.HttpClient.post(`${environment.base_url}/payrollEmployee/updatePayrollEmployee/`,payLoad)
   }
   softDeletePayrollEmployeeIdData(Id:any) {
     return this.HttpClient.delete(`${environment.base_url}/payrollEmployee/softdeletePayrollEmployeeWithId/${Id}`);
   };

   convertToDate(dateString: string): Date {
    return new Date(dateString);
  }

  //create pay calendar weekly,2-weekly,4-weekly
  createPayCalendar(payload:any){
    return this.HttpClient.post(`${environment.base_url}/weeklyPayCalendarPatterns/createWeeklyPayDayCalendar`,payload)
   }
  //get all pay calendar weekly,2-weekly,4-weekly
   getAllPayCalendar(){
    return this.HttpClient.get(`${environment.base_url}/weeklyPayCalendarPatterns/getAllWeeklyPayDayCalendar`)
   }
  //delete pay calendar weekly,2-weekly,4weekly
  deletePayCalendar(id:any){
    return this.HttpClient.delete(`${environment.base_url}/weeklyPayCalendarPatterns/deleteWeeklyPayDayCalendar/${id}`);
  }
  //get by id pay calendar weekly,2-weekly,4-weekly
  getPayCalendarById(id:any){
    return this.HttpClient.get(`${environment.base_url}/weeklyPayCalendarPatterns/getWeeklyPayDayCalendarById/${id}`)
  }
 // update by id pay calendar weekly,2-weekly,4-weekly
 updatePayCalendar(payLoad:any , id:any){
  return this.HttpClient.patch(`${environment.base_url}/weeklyPayCalendarPatterns/updateWeeklyPayDayCalendar/${id}`,payLoad)
 }

  //create monthly pay calendar
  createMonthlyCalendar(payload:any){
    return this.HttpClient.post(`${environment.base_url}/monthlyPayCalendarPatterns/createMonthlyPayDayCalendar`,payload)
   }

  //get monthly pay calendar
  getAllMonthlyCalendar(){
    return this.HttpClient.get(`${environment.base_url}/monthlyPayCalendarPatterns/getAllMonthlyPayDayCalendar`)
  } 

  //get by id monthly pay calendar
  getMonthlyCalendarById(id:any){
    return this.HttpClient.get(`${environment.base_url}/monthlyPayCalendarPatterns/getMonthlyPayDayCalendarById/${id}`)
  }
 
  //delete monthly pay calendar
  deleteMonthlyCalendar(id:any){
    return this.HttpClient.delete(`${environment.base_url}/monthlyPayCalendarPatterns/deleteMonthlyPayDayCalendar/${id}`);
  }

  // update by id monthly pay calendar
 updateMonthlyCalendar(payLoad:any , id:any){
  return this.HttpClient.patch(`${environment.base_url}/monthlyPayCalendarPatterns/updateMonthlyPayDayCalendar/${id}`,payLoad)
 }
}
