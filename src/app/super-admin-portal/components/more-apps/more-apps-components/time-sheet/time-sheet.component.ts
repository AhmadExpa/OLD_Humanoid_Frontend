import { ToastrService } from 'ngx-toastr';
import { PaySlipManagementService } from '../../../../../shared-portal/services/pay-slip-management.service';
import { ClientManagementService } from '../../../../../shared-portal/services/client-management.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { clientModel } from 'src/app/shared-portal/models/clientModel';
import { UmbrellaCompanyManagementService } from 'src/app/shared-portal/services/umbrella-company-management.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent implements OnInit {

  public timeSheetForm: any | FormGroup;
  public allClients: clientModel[] = [];
  public showTimeSheetControls: Boolean | any;
  public getAllUmbrellaServiceData: any = [];
  public candidateNames: any;
  public visible: boolean = false;
  public showInputField:boolean=false;
  public addingValues: number[] = [];
  public totalPaySum:number = 0;
  public rules:any = [{name:'Add Percentage Rule', value:'percentage'}]
  public modalForm: any | FormGroup;
  public ruleName:string = '';
  public ruleData:any;
  public selectedCandidate: any;
  public ruleType: 'percent' | 'subtract' = 'percent';
  public selectedCompanyName:any;
  public accomodationCategories=[{name:'Accomodations'},{name:'Others'}]
  

  constructor(
    private readonly FormBuilder: FormBuilder,
    private readonly ClientManagementService: ClientManagementService,
    private readonly PaySlipManagementService: PaySlipManagementService,
    private readonly UmbrellaCompanyService: UmbrellaCompanyManagementService,
    private readonly ToastrService: ToastrService,
    private readonly ActivatedRoute:ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    this.getAllClients();
    this.timeSheetFormInit();
    this.getAllDataOfUmbrellaService();
    this.initModalForm();
    this.getSelectedCompanyName();
    
  }

public getSelectedCompanyName(){
  this.ActivatedRoute.paramMap.subscribe((params:any) => {
    this.selectedCompanyName = params.params.Id;
  });
}

  showDialog() {
    this.visible = true;
}
closeModal(){
  this.visible = false;
}


public initModalForm() {
  this.modalForm =  this.FormBuilder.group({
    ruleName: new FormControl('',Validators.required),
    ruleValue: new FormControl('',Validators.required),
  })
}

  timeSheetFormInit() {
    this.timeSheetForm = this.FormBuilder.group({
      client: new FormControl('', Validators.required),
      useMarginFee: new FormControl('', Validators.required),
      agency: new FormControl('', Validators.required),
      week: new FormControl('', Validators.required),
      timeSheetControlsArray: new FormArray([]),
      deductionControlsArray: new FormArray([])
    })
  }

 

  
  checkWeek(data: any) {
    const client = this.timeSheetForm.get('client').value;
    if (client && client._id) {
      const payload = { week: Number(data.target.value), email: client.email };
      this.PaySlipManagementService.weekExists(payload).subscribe(({ result, message, data }: any) => {
        this.ToastrService[data ? 'success' : 'warning'](message);
        !data ? this.timeSheetForm.get('week').setValue(null) : '';
        this.showTimeSheetControls = data;
      })
    }
  }

  getAllClients() {
    this.ClientManagementService.getAllClients().subscribe(({ result }: any) => {
      this.allClients = result;
      this.allClients.sort((a, b) => a.foreName.localeCompare(b.foreName));
      this.candidateNames = [...this.allClients];
    })


  }
  

  initRowData(): FormArray {
    return this.timeSheetForm.get('timeSheetControlsArray') as FormArray;
  }

  initDeductionRowData(): FormArray {
    return this.timeSheetForm.get('deductionControlsArray') as FormArray;
  }

  initTimeSheetRow(): FormGroup {
    return this.FormBuilder.group({
      paySlipWeek: new FormControl(''),
      from: new FormControl(''),
      to: new FormControl(''),
      unit: new FormControl(''),
      rate: new FormControl(''),
      totalPay: new FormControl(''),
      marginFeeTimeSheet: new FormControl(''),
      manuallyMarginFee:null
    })
  }

  initDeductionRow(): FormGroup {
    return this.FormBuilder.group({
      paySlipWeek: new FormControl(''),
      deductionCategory: new FormControl(''),
      deductionAmount: new FormControl(''),
      date: new FormControl(''),
      marginFeeDeductionSheet: new FormControl(''),
      manuallyMarginFee:null
    })
  }

  totalTimeSheet(index: any) {
    const value = this.timeSheetForm.get('week').value;
    const controls = this.timeSheetForm.get('timeSheetControlsArray').at(index);
    const { unit, rate } = controls.value;
    controls.get('totalPay').setValue(Math.round((parseFloat(unit) * parseFloat(rate)) * 100) / 100);
    controls.get('paySlipWeek').setValue(value);
    const { timeSheetControlsArray } = this.timeSheetForm.value;
    controls.get('marginFeeTimeSheet').setValue(this.timeSheetForm.get('useMarginFee').value);
    this.totalPaySum = timeSheetControlsArray.reduce((acc:any, entry:any) => {
      if (entry.totalPay !== "") {
        return acc + Number(entry.totalPay);
      }
      return acc;
    }, 0);
  }

  totalDeduction(index: any) {
    const value = this.timeSheetForm.get('week').value;
    const controls = this.timeSheetForm.get('deductionControlsArray').at(index);
    // const { unit, rate } = controls.value;
    // const totalPay = parseInt(unit) * parseInt(rate);
    // controls.get('total').setValue(totalPay);
    controls.get('paySlipWeek').setValue(value);
    controls.get('marginFeeDeductionSheet').setValue(this.timeSheetForm.get('useMarginFee').value)
  }

  onTotalPayChange(event: any) {
    const value = event.target.value;
    this.addingValues.push(value);
  }

  addRow() {
    const sum = this.addingValues.reduce((acc, curr) => acc + curr, 0);
    this.initRowData().push(this.initTimeSheetRow());
    this.showInputField = true;
  }

  addDeductionRow() {
    this.initDeductionRowData().push(this.initDeductionRow());
  }

  removeTimeSheetRow(rowNumber: any) {
    this.initRowData().removeAt(rowNumber);
  }

  removeDeductionRow(rowNumber: any) {
    this.initDeductionRowData().removeAt(rowNumber);
  }

  flagForRule(event: any) {
    const value = event.target.value;
    if (!!value) {
      this.ruleName = value;
    } else {
      this.ruleName = '';
    }
  }

  initModalValues(){
    this.ruleData = this.modalForm.value;
    this.ToastrService.success('Rule Saved');
  }

  submitData() {
    const { agency, client, useMarginFee, week, timeSheetControlsArray, deductionControlsArray } = this.timeSheetForm.value;
    
    // const paySlipWeeklyInformation:any = { week, timeSheetData: [...timeSheetControlsArray], deductionSheetData: [...deductionControlsArray] };

    const paySlipWeeklyInformation:any = { 
      week, 
      timeSheetData: [...timeSheetControlsArray], 
      deductionSheetData: deductionControlsArray.map((deduction:any) => ({
        ...deduction,
        deductionCategory: deduction.deductionCategory.name  // Extract the name property
      }))
    };
    const payLoad:any = { agency, client, useMarginFee, paySlipWeeklyInformation };
    if (!!this.ruleName) {
      if (this.ruleName === 'MARGIN_RULE_VALUE') {
        // For adding margin rule
        const { ruleValue } = this.ruleData;
        paySlipWeeklyInformation.timeSheetData = paySlipWeeklyInformation.timeSheetData.map((item: any) => {
          const manuallyMarginFee = parseFloat((this.totalPaySum - (parseInt(ruleValue ||0) )).toFixed(2));
          return {
            ...item,
            manuallyMarginFee: manuallyMarginFee
          };
        });
      } 
      else if (this.ruleName === 'PERCENTAGE_RULE_VALUE') {
        // For adding percentage rule
        const { ruleValue } = this.ruleData;
        paySlipWeeklyInformation.timeSheetData = paySlipWeeklyInformation.timeSheetData.map((item: any) => {
          const manuallyMarginFee = parseFloat((this.totalPaySum * (parseInt(ruleValue || 0) / 100)).toFixed(2));
  
          return {
            ...item,
            manuallyMarginFee: manuallyMarginFee
          };
        });
      }
    }
    
    this.PaySlipManagementService.addPaySlip(payLoad).subscribe(({ message, data }: any) => {
      this.ToastrService[data ? 'success' : 'error'](message);
      this.timeSheetForm.reset();
    })
  }
  getAllDataOfUmbrellaService() {
    this.UmbrellaCompanyService.getUmbrellaCompanyFormData().subscribe((res: any) => {
      this.getAllUmbrellaServiceData = res.result;
      this.getAllUmbrellaServiceData = this.getAllUmbrellaServiceData.filter( (item:any) => item.companyName === this.selectedCompanyName )
    })

  }
}
