import { PaySlipManagementService } from './../../../../../shared-portal/services/pay-slip-management.service';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-time-sheet-report',
  templateUrl: './time-sheet-report.component.html',
  styleUrls: ['./time-sheet-report.component.css']
})
export class TimeSheetReportComponent implements OnInit {

  public paySlips: any = [];
  public clonePaySlips: any = [];
  public paySlipIndividualData: any = {};
  public totalTsValue: number = 0;
  public grossAmount: number = 0;
  public totalDeduction: number = 0;
  public timeSheetData: any = [];
  public deductionSheetData: any = [];
  public totalDeductions: number = 0;
  public totalDeductionValue: number = 0;
  public weekSlip: any = {};
  public paySlipId: any
  public weekId: any
  // updated primeNg
  public cols: any = [];
  public _selectedColumns: any = [];



  constructor(
    private readonly PaySlipManagementService: PaySlipManagementService,
    private readonly ToastrService: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.getAllPaySlips();


    // ---------- Toggle-Column ------------- //
    this.cols = [
      { field: 'client.name', header: 'Name' },
      { field: 'client.businessAndCompanyName', header: 'Bussiness And Company Name' },
      { field: 'createdAt', header: 'Created Date' },
      { field: 'paySlipWeeklyInformation', header: 'Weeks' },
      { field: 'agency', header: 'Agency' }
    ];

    this._selectedColumns = this.cols;
   
  }
  getNestedValue(obj: any, field: string): any {
    const fields = field.split('.');
    let value = obj;
    for (const f of fields) {
      value = value?.[f];
    }
    return value;
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
  }


  // ---------- Toggle-Column ------------- //


  getAllPaySlips() {
    this.PaySlipManagementService.getAllPaySlip().subscribe(({ result }: any) => {
      this.paySlips = result;
    })
  }
  getField(field: string, header: string): string {
    const nestedFields = field.split('.'); // Split the nested fields by '.'

    let value = this.paySlips; // Assuming your data is available in 'this.data'

    // Iterate through the nested fields
    for (const nestedField of nestedFields) {
      value = value?.[nestedField]; // Access the nested field value
    }

    // Return the final value or a default header value if it's undefined
    return value !== undefined ? value : header;
  }



  downloadRTINumber(): void {

  }

  deletePaySlip(Id: any) {
    this.PaySlipManagementService.deletePaySlipById(Id).subscribe(({ message }: any) => {
      this.ToastrService.error(message);
      this.getAllPaySlips();
    })
  }

  getPaySlipById(id: any) {
    this.PaySlipManagementService.getPaySlipById(id).subscribe(({ result }: any) => {
      this.paySlipIndividualData = result;
    });
  }

  onRowEditSave(saveData: any, index: number) {
    if (saveData.rating > 0) {
      delete this.clonePaySlips[index];
  
    } else {
      // this.PaySlipManagementService.registrationThroughEmailUpdataFormData(saveData).subscribe(({ data, message }: any) => {
      //   this.ToastrService[data ? 'success' : 'error'](message);
      //   this.paySlips = [];
      //   this.paySlipId = [];
      //   this.getAllPaySlips();
      // })
    }
  }

  onRowEditInit(initData: any, index: number,) {
    this.clonePaySlips[index] = { ...this.paySlips[index] };
    // const payLoad = { ...this.allConversionSaleData.value, _id: this.makeMyIdPublic };

    //this.clonedProducts[product.id] = { ...product };
  }



  onRowEditCancel(cancelEditingData: any, index: number) {
    this.paySlips[index] = this.clonePaySlips[index];
    delete this.clonePaySlips[index];
    this.ToastrService.warning("Cancel-Editing")
  }


  clear(table: any) {
    table.clear();
}

  activeModal(Id: any) {
    this.paySlipId = Id;
  }


  getWeeklySlip(data: any) {
    let marginFee = 0;
    const { client, paySlipWeeklyInformation } = this.paySlipIndividualData;
    const weekPaySlip = paySlipWeeklyInformation.find((entry: any) => entry.week === data.week);
    const checkIfManuallyMarginFeeAdded = weekPaySlip?.timeSheetData[0].manuallyMarginFee;
    if(checkIfManuallyMarginFeeAdded){
      marginFee = checkIfManuallyMarginFeeAdded
    }else{
      marginFee = weekPaySlip?.timeSheetData[0].marginFeeTimeSheet === 'No' ? 0 : client.marginFee;
    }
    this.weekSlip = paySlipWeeklyInformation.find((info: any) => info.week === data.week);
    const { timeSheetData, deductionSheetData } = this.weekSlip;
    this.timeSheetData = timeSheetData;
    this.deductionSheetData = deductionSheetData;
    this.totalTsValue = Math.round((timeSheetData.reduce((acc: any, { totalPay }: any) => acc + totalPay, 0)) * 100) / 100;
    this.totalDeductions = Math.round((deductionSheetData.reduce((acc: any, { dedutcions }: any) => acc + dedutcions, 0)) * 100) / 100;
    this.grossAmount = parseFloat((this.totalTsValue - marginFee).toFixed(2));
    this.totalDeductionValue = parseFloat((this.grossAmount - this.totalDeductions).toFixed(2));
    this.totalDeduction = marginFee;
  }

  sendEmailToClient(clientEmail: any) {

    const { client, createdAt, agencyDetails } = this.paySlipIndividualData;
    const processDate = new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const emailData = {
      agencyDetails,
      clientEmail,
      clientName: client.name,
      processDate,
      weekSlip: this.weekSlip,
      totalTsValue: this.totalTsValue,
      grossAmount: this.grossAmount,
      totalDeductionValue: this.totalDeductionValue,
      totalDeduction: this.totalDeduction,
      totalDeductions: this.totalDeductions,
      timeSheetData: this.timeSheetData,
      deductionSheetData: this.deductionSheetData
    };
    this.PaySlipManagementService.sendEmailToClient(emailData).subscribe(({ data, message }: any) => {
      this.ToastrService[data ? 'success' : 'error'](message);
    })

  }

  activeWeekModal(Id: any) {
    this.weekId = Id;
    this.getAllPaySlips();
  }

  public deleteParticularField(particularFieldId: any) {
    const { _id: paySlipId } = this.paySlipIndividualData;
    const { _id: particularWeekId, week } = particularFieldId;
    const payLoad = {
      paySlipId,
      week: week,
      particularWeekId
    }
    //  console.log(payLoad)
    //  console.log(particularFieldId);
    this.PaySlipManagementService.deleteParticularField(payLoad).subscribe(({ data, message }: any) => {
      this.ToastrService[data ? 'success' : 'error'](message);
    })
    this.getAllPaySlips();
  }



}
