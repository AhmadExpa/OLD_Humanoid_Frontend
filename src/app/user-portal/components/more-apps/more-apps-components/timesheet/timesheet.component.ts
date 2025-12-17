import { ToastrService } from 'ngx-toastr';
import { PaySlipManagementService } from './../../../../../shared-portal/services/pay-slip-management.service';
import { ClientManagementService } from './../../../../../shared-portal/services/client-management.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { clientModel } from 'src/app/shared-portal/models/clientModel';
import { UmbrellaCompanyManagementService } from 'src/app/shared-portal/services/umbrella-company-management.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  public timeSheetForm: any | FormGroup;
  public allClients: clientModel[] = [];
  public showTimeSheetControls: Boolean | any;
  public getAllUmbrellaServiceData: any = [];
  public candidateNames: any;

  constructor(
    private readonly FormBuilder: FormBuilder,
    private readonly ClientManagementService: ClientManagementService,
    private readonly PaySlipManagementService: PaySlipManagementService,
    private readonly UmbrellaCompanyService: UmbrellaCompanyManagementService,
    private readonly ToastrService: ToastrService
  ) {
    this.timeSheetFormInit();
    this.getAllDataOfUmbrellaService();
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

  ngOnInit(): void {
    this.getAllClients();
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
      marginFeeTimeSheet: new FormControl('')
    })
  }

  initDeductionRow(): FormGroup {
    return this.FormBuilder.group({
      paySlipWeek: new FormControl(''),
      dedutcions: new FormControl(''),
      from: new FormControl(''),
      to: new FormControl(''),
      marginFeeDeductionSheet: new FormControl('')
    })
  }

  totalTimeSheet(index: any) {
    const value = this.timeSheetForm.get('week').value;
    const controls = this.timeSheetForm.get('timeSheetControlsArray').at(index);
    const { unit, rate } = controls.value;
    controls.get('totalPay').setValue(Math.round((parseFloat(unit) * parseFloat(rate)) * 100) / 100);
    controls.get('paySlipWeek').setValue(value);
    controls.get('marginFeeTimeSheet').setValue(this.timeSheetForm.get('useMarginFee').value)
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

  addRow() {
    this.initRowData().push(this.initTimeSheetRow());
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


  submitData() {
    const { agency, client, useMarginFee, week, timeSheetControlsArray, deductionControlsArray } = this.timeSheetForm.value;
    const paySlipWeeklyInformation = { week, timeSheetData: [...timeSheetControlsArray], deductionSheetData: [...deductionControlsArray] };
    const payLoad = { agency, client, useMarginFee, paySlipWeeklyInformation };
    this.PaySlipManagementService.addPaySlip(payLoad).subscribe(({ message, data }: any) => {
      this.ToastrService[data ? 'success' : 'error'](message);
      this.timeSheetForm.reset();
    })
  }

  getAllDataOfUmbrellaService() {
    this.UmbrellaCompanyService.getUmbrellaCompanyFormData().subscribe((res: any) => {
      this.getAllUmbrellaServiceData = res.result;
    })

  }
}

