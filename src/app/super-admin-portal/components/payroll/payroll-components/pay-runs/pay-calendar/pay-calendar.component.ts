import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PayrollService } from 'src/app/shared-portal/services/payroll-management/payroll.service';

@Component({
  selector: 'app-pay-calendar',
  templateUrl: './pay-calendar.component.html',
  styleUrls: ['./pay-calendar.component.css']
})
export class PayCalendarComponent {
  weekly_pay : FormGroup | any;
  monthly_pay: FormGroup | any;
  two_weekly_pay : FormGroup | any;
  four_weekly_pay : FormGroup | any;
  payCalender : any = []
  weeklyCalendars:any = []
  two_weeklyCalendar:any = []
  four_weeklyCalendar:any = []
  monthly_Calendar:any = []
  id: any;
  isUpdateMode = false;
  pay_Day = [
    {id:1 , day:'Sunday'},
    {id:2 , day:'Monday'},
    {id:3 , day:'Tuesday'},
    {id:4 , day:'Wednesday'},
    {id:5 , day:'Thursday'},
    {id:6 , day:'Friday'},
    {id:7 , day:'Saturday'}
  ]
  pay_On = [
    {id:1 , pay:'same day of month'},
    {id:2 , pay:'Last day of month'}
  ]
  select_Day_Of_Month = [
    {id:1 , day:'1st'},
    {id:2 , day:'2nd'},
    {id:3 , day:'3rd'},
    {id:4 , day:'4th'},
    {id:5 , day:'5th'},
    {id:6 , day:'6th'},
    {id:7 , day:'7th'},
    {id:8 , day:'8th'},
    {id:9 , day:'9th'},
    {id:10 , day:'10th'},
    {id:11 , day:'11th'},
    {id:12 , day:'12th'},
    {id:13 , day:'13th'},
    {id:14 , day:'14th'},
    {id:15 , day:'15th'},
    {id:15 , day:'15th'},
    {id:16 , day:'16th'},
    {id:17 , day:'17th'},
    {id:18 , day:'18th'},
    {id:19 , day:'19th'},
    {id:20 , day:'20th'},
    {id:21 , day:'21th'},
    {id:22 , day:'22th'},
    {id:23 , day:'23th'},
    {id:24 , day:'24th'},
    {id:25 , day:'25th'},
    {id:26 , day:'26th'},
    {id:27 , day:'27th'},
    {id:28 , day:'28th'},
    {id:29 , day:'29th'},
    {id:30 , day:'30th'},
    {id:31 , day:'31th'}
  ]
  pay_Runs = [
    {id:1 , date:'2024/2025'},
    {id:2 , date:'2023/2024'}
  ]
  pay_Runs_Month = [
    {id:1 , month:'April 2024'},
    {id:2 , month:'May 2024'},
    {id:3 , month:'June 2024'},
    {id:4 , month:'July 2024'},
    {id:5 , month:'August 2024'},
    {id:6 , month:'September 2024'},
    {id:7 , month:'October 2024'},
    {id:8 , month:'November 2024'},
    {id:9 , month:'December 2024'},
    {id:10 , month:'January 2024'},
    {id:11 , month:'February 2024'},
    {id:12 , month:'March 2024'}
  
  ]
    data: any = {};
  
  constructor(private readonly formBuilder:FormBuilder,
              private readonly payrollService:PayrollService,
              private readonly toasterService:ToastrService
  ){
  }
  
  
    ngOnInit(){
    this.weeklyPayModal()
    this.two_weeklyPayModal()
    this.four_weeklyPayModal()
    this.monthlyPayModal()
    this.getAllPayCalendar()
    this.getAllMonthlyCalender()
    }
  
  //weekly pay form modal
  weeklyPayModal(){
    this.weekly_pay = this.formBuilder.group({
      payDay: new FormControl(this.pay_Day[0].day , [Validators.required]),
      firstPayRun: new FormControl('', [Validators.required]),
      avoidPublicHolidaysAndWeekends:new FormControl(true, [Validators.required]),
    })
  }
  
  
  getWeeklyFormData(){
    const formValue = this.weekly_pay.value
    return {
      payDay: formValue.payDay,
      firstPayRun:formValue.firstPayRun,
      avoidPublicHolidaysAndWeekends:formValue.avoidPublicHolidaysAndWeekends,
      calenderType:'weekly'
    }
  }
  
  weeklyPaySubmit(){
   const formData = this.getWeeklyFormData();
   const service = this.isUpdateMode ? this.payrollService.updatePayCalendar(formData , this.id) :
   this.payrollService.createPayCalendar(formData)
     
    service.subscribe(({ message, data }: any) => {
      this.toasterService[data ? 'success' : 'error'](message);
      if (data) {
        this.weekly_pay.reset();
        this.getAllPayCalendar();
      }
    });
  }
  
  //2-weekly pay form modal
  two_weeklyPayModal(){
    this.two_weekly_pay = this.formBuilder.group({
      payDay: new FormControl(this.pay_Day[0].day, [Validators.required]),
      firstPayRun: new FormControl('', [Validators.required]),
      avoidPublicHolidaysAndWeekends:new FormControl(true, [Validators.required]),
    })
  }
  
   twoWeeklyFormData(){
    const formValue = this.two_weekly_pay.value;
    return{
      payDay: formValue.payDay,
      firstPayRun:formValue.firstPayRun,
      avoidPublicHolidaysAndWeekends:formValue.avoidPublicHolidaysAndWeekends,
      calenderType:'2-weekly'
    }
  }
  
  twoWeeklySubmit(){
    const formData = this.twoWeeklyFormData();
    const service = this.isUpdateMode ? this.payrollService.updatePayCalendar(formData , this.id) :
    this.payrollService.createPayCalendar(formData)
      
     service.subscribe(({ message, data }: any) => {
       this.toasterService[data ? 'success' : 'error'](message);
       if (data) {
         this.weekly_pay.reset();
         this.getAllPayCalendar();
       }
     });
  }
  
  //4-weekly pay form modal
  four_weeklyPayModal(){
    this.four_weekly_pay = this.formBuilder.group({
      payDay: new FormControl(this.pay_Day[0].day, [Validators.required]),
      firstPayRun: new FormControl('', [Validators.required]),
      avoidPublicHolidaysAndWeekends:new FormControl(true, [Validators.required]),
    })
  }
  
  fourWeeklyFormData(){
    const formValue = this.two_weekly_pay.value;
    return{
      payDay: formValue.payDay,
      firstPayRun:formValue.firstPayRun,
      avoidPublicHolidaysAndWeekends:formValue.avoidPublicHolidaysAndWeekends,
      calenderType:'4-weekly'
    }
  }
  
  fourWeeklySubmit(){
    const formData = this.twoWeeklyFormData();
    const service = this.isUpdateMode ? this.payrollService.updatePayCalendar(formData , this.id) :
    this.payrollService.createPayCalendar(formData)
      
     service.subscribe(({ message, data }: any) => {
       this.toasterService[data ? 'success' : 'error'](message);
       if (data) {
         this.weekly_pay.reset();
         this.getAllPayCalendar();
       }
     });
  }
  
  //monthly pay form modal
  monthlyPayModal(){
    this.monthly_pay = this.formBuilder.group({
      payOn: new FormControl('', [Validators.required]),
      dayOfTheMonth: new FormControl('', [Validators.required]),
      firstPayRun: new FormControl('', [Validators.required]),
      avoidPublicHolidaysAndWeekends:new FormControl(true, [Validators.required]),
    })
  }
  
  getMonthlyFormData(){
    const formValue = this.monthly_pay.value;
    return{
      payOn : formValue.payOn,
      dayOfTheMonth:formValue.dayOfTheMonth,
      firstPayRun:formValue.firstPayRun,
      avoidPublicHolidaysAndWeekends:formValue.avoidPublicHolidaysAndWeekends
  
    }
  }
  
  monthlyPaySubmit(){
    const formData = this.getMonthlyFormData();
    const service = this.isUpdateMode ? this.payrollService.updateMonthlyCalendar(formData , this.id) :
    this.payrollService.createMonthlyCalendar(formData)
      
     service.subscribe(({ message, data }: any) => {
       this.toasterService[data ? 'success' : 'error'](message);
       if (data) {
         this.weekly_pay.reset();
         this.getAllMonthlyCalender();
       }
     });
  }
  
  //get All Pay Calendar
  getAllPayCalendar(){
    this.payCalender = this.payrollService.getAllPayCalendar().subscribe((res:any)=>{
      if(res.result){
         this.weeklyCalendars = res.result.filter((item:any)=> item.calenderType === 'weekly')
         this.two_weeklyCalendar = res.result.filter((item:any)=> item.calenderType === '2-weekly')
         this.four_weeklyCalendar = res.result.filter((item:any)=> item.calenderType === '4-weekly')
      }
    })
  }
  
  
  //get All Monthly Calendar
  getAllMonthlyCalender(){
    this.payrollService.getAllMonthlyCalendar().subscribe((res:any)=>{
      this.monthly_Calendar = res.result
    })
  }
  
  //delete pay Calendar weekly , 2-weekly , 4-weekly
  deletePayCalendar(id:any){
    this.payrollService.deletePayCalendar(id).subscribe(({ data, message }: any) => {
      this.toasterService[data ? 'success' : 'error'](message);
      if (data) {
       this.filterDeletedItem(id)
      }
    });
  }
  
  //filter out the items 
  filterDeletedItem(id: any) {
    const filterFunction = (item: any) => item._id !== id;
    this.weeklyCalendars = this.weeklyCalendars.filter(filterFunction);
    this.two_weeklyCalendar = this.two_weeklyCalendar.filter(filterFunction);
    this.four_weeklyCalendar = this.four_weeklyCalendar.filter(filterFunction);
  }
  
  //delete pay Calendar weekly , 2-weekly , 4-weekly
  deleteMonthlyCalendar(id:any){
    this.payrollService.deleteMonthlyCalendar(id).subscribe(({data , message}:any)=>{
      this.toasterService[data ? 'success' : 'error'](message);
      if (data) {
      this.getAllMonthlyCalender()
      }
    })
  }
  
  
  //get data by id weekly , 2-weekly , 4-weekly
  getDataById(id: any) {
    this.isUpdateMode = true
    this.id = id
    this.payrollService.getPayCalendarById(id).subscribe((res: any) => {
      const data = res.result;
      const formValues = {
        payDay: data?.payDay || '',
        firstPayRun: this.payrollService.convertToDate(data?.firstPayRun) || '',
        avoidPublicHolidaysAndWeekends: data?.avoidPublicHolidaysAndWeekends || true
      };
      this.two_weekly_pay.setValue(formValues);
      this.weekly_pay.setValue(formValues);
      this.four_weekly_pay.setValue(formValues);
    });
  }
  
  //get data by id monthly
  getMonthlyCalendarById(id: any) {
    this.isUpdateMode = true
    this.id = id
    this.payrollService.getMonthlyCalendarById(id).subscribe((res: any) => {
      const data = res.result;
      const formValues = {
        payOn: data?.payOn || '',
        dayOfTheMonth: data?.dayOfTheMonth || '',
        firstPayRun: this.payrollService.convertToDate(data?.firstPayRun) || '',
        avoidPublicHolidaysAndWeekends: data?.avoidPublicHolidaysAndWeekends || true
      };
      this.monthly_pay.setValue(formValues);
    });
  }
}
