import { DatePipe } from '@angular/common';
import { PaySlipManagementService } from '../../../../../shared-portal/services/pay-slip-management.service';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UmbrellaCompanyManagementService } from 'src/app/shared-portal/services/umbrella-company-management.service';
import { COMPANYIMAGES } from 'src/app/shared-portal/enums/company-images.enums';

@Component({
  selector: 'app-time-sheet-report',
  templateUrl: './time-sheet-report.component.html',
  styleUrls: ['./time-sheet-report.component.css'],
  providers: [DatePipe],
})
export class TimeSheetReportComponent implements OnInit {

  public paySlips: any = [];
  public sendingEmail:boolean = false;
  public imageUrl: string=''
  public getAllUmbrellaServiceData: any = []
  public agencyOptions: any[] = [];
  public clonePaySlips: any = [];
  public paySlipIndividualData: any = {};
  public totalTsValue: number = 0;
  public grossAmount: number = 0;
  public totalDeduction: number = 0;
  public timeSheetData: any = [];
  public deductionSheetData: any = [];
  public totalDeductions: number = 0;
  public totalAccomodationDeductions:number=0;
  public totalOthersDeductions:number=0;

  public totalDeductionValue: number = 0;
  public weekSlip: any = {};
  public paySlipId: any
  public weekId: any
  public convertMarginFeeStringToNumber: any
  // updated primeNg
  public cols: any = [];
  public _selectedColumns: any = [];
  public agency: any;



  constructor(
    private readonly PaySlipManagementService: PaySlipManagementService,
    private readonly ToastrService: ToastrService,
    private readonly datePipe: DatePipe,
    private readonly UmbrellaCompanyService: UmbrellaCompanyManagementService
  ) {

  }

  ngOnInit(): void {
    this.getAllPaySlips();
    this.getAllDataOfUmbrellaService()


    // ---------- Toggle-Column ------------- //
    this.cols = [
      { field: 'client.name', header: 'Name' },
      { field: 'client.businessAndCompanyName', header: 'Bussiness And Company Name' },
      { field: 'createdAt', header: 'Created Date', pipe:"date, 'yyyy-MM-dd HH:mm:ss' " },
      { field: 'client.agency', header: 'Agency' }
    ];

    this._selectedColumns = this.cols;
    // this.selectedColumns = this.cols.map((col:any) => col.field);

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
  formatCreatedAt(date: string): any {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return formattedDate || '';
  }


  getAllPaySlips() {
    this.PaySlipManagementService.getAllPaySlip().subscribe(({ result }: any) => {
      this.paySlips = result;
    })
  }

  getAllDataOfUmbrellaService() {
    this.UmbrellaCompanyService.getUmbrellaCompanyFormData().subscribe(({ result }: any) => {
      this.getAllUmbrellaServiceData = result;
      // this.agencyOptions = this.getAllUmbrellaServiceData.map((client: any) => client.companyName
      // ).filter((agency: string, index: number, self: string[]) => self.indexOf(agency) === index);
      // console.log(this.agencyOptions);

      const uniqueAgencies = new Set(this.getAllUmbrellaServiceData.map((client: any) => client.companyName));
      this.agencyOptions = Array.from(uniqueAgencies);
    })
  }

  // getField(field: string, header: string): string {
  //   const nestedFields = field.split('.'); 

  //   let value = this.paySlips; 

  //   for (const nestedField of nestedFields) {
  //     value = value?.[nestedField]; 
  //   }
  //   return value !== undefined ? value : header;
  // }

  getField(obj: any, field: string): any {
    const nestedFields = field.split('.');
    let value = obj;
    for (const nestedField of nestedFields) {
      value = value?.[nestedField];
    }
    return value;
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

  onRowEditSave(saveData: any, index: number) {
    if (saveData.rating > 0) {
      delete this.clonePaySlips[index];

    } else {
      this.PaySlipManagementService.updatePaySlipDataById(saveData).subscribe(({ data, message }: any) => {
        this.ToastrService[data ? 'success' : 'error'](message);
        this.paySlips = [];
        this.paySlipId = [];
        this.getAllPaySlips();
      })
    }
  }

  // onRowEditSave(saveData: any, index: number) {
  //   if (saveData.rating > 0) {
  //     delete this.clonePaySlips[index];
  //   } else {
  //     console.log(saveData);
  //     this.PaySlipManagementService.updatePaySlipDataById(saveData).subscribe(({ data, message }: any) => {
  //       this.ToastrService[data ? 'success' : 'error'](message);
  //       this.paySlips[index] = { ...this.paySlips[index], ...saveData.client };

  //       this.paySlipId = [];
  //       this.getAllPaySlips();
  //     })
  //   }
  // }

  // onRowEditSave(saveData: any, index: number) {
  //   if (saveData.rating > 0) {
  //     delete this.clonePaySlips[index];
  //   } else {
  //     console.log(saveData);

  //     // Update only the client's name property
  //     const updatedClientData = {
  //       ...this.paySlips[index].client,
  //       name: saveData.client.name
  //     };

  //     // Create an updated pay slip object with the modified client data
  //     const updatedPaySlip = {
  //       ...this.paySlips[index],
  //       client: updatedClientData
  //     };

  //     this.PaySlipManagementService.updatePaySlipDataById(updatedPaySlip).subscribe(({ data, message }: any) => {
  //       this.ToastrService[data ? 'success' : 'error'](message);

  //       // Update the paySlips array with the edited value
  //       this.paySlips[index] = updatedPaySlip;

  //       this.paySlipId = [];
  //       this.getAllPaySlips();
  //     });
  //   }
  // }







  clear(table: any) {
    table.clear();
  }

  activeModal(Id: any) {
    this.paySlipId = Id;
  }


  getWeeklySlip(data: any) {
    let marginFee = 0;
    const { client, paySlipWeeklyInformation } = this.paySlipIndividualData;
    this.agency = client.agency;
    const companiesLogo:any = {
      'planetpayroll':COMPANYIMAGES['planetpayroll'],
      'payrollbusiness':COMPANYIMAGES['payrollbusiness'],
      'sweetumbrella':COMPANYIMAGES['sweetumbrella'],
      'purplepayumbrella':COMPANYIMAGES['purplepayumbrella'],
      'emzrelcorporation':COMPANYIMAGES['emzrelcorporation'],
    }
    this.imageUrl = companiesLogo[client.agency];
    const weekPaySlip = paySlipWeeklyInformation.find((entry: any) => entry.week === data.week);
    const checkIfManuallyMarginFeeAdded = weekPaySlip?.timeSheetData[0].manuallyMarginFee;

    if (checkIfManuallyMarginFeeAdded) {
      marginFee = checkIfManuallyMarginFeeAdded;
    } else {
      marginFee = weekPaySlip?.timeSheetData[0].marginFeeTimeSheet === 'No' ? 0 : client.marginFee;
    }
    let marginFeeString = marginFee.toString();
    this.convertMarginFeeStringToNumber = parseFloat(marginFeeString);

    this.weekSlip = paySlipWeeklyInformation.find((info: any) => info.week === data.week);
    const { timeSheetData, deductionSheetData } = this.weekSlip;
    this.timeSheetData = timeSheetData;
    this.deductionSheetData = deductionSheetData;
    this.totalTsValue = Math.round((timeSheetData.reduce((acc: any, { totalPay }: any) => acc + totalPay, 0)) * 100) / 100;
    this.totalDeductions = Math.round((deductionSheetData.reduce((acc: any, { deductionAmount }: any) => acc + deductionAmount, 0)) * 100) / 100;
    this.grossAmount = parseFloat((this.totalTsValue - this.convertMarginFeeStringToNumber).toFixed(2));
    this.totalDeductionValue = parseFloat((this.grossAmount - this.totalDeductions).toFixed(2));
    this.totalDeduction = this.convertMarginFeeStringToNumber;

    this.totalAccomodationDeductions = Math.round(
      (deductionSheetData
        .filter(({ deductionCategory }:any) => deductionCategory === "Accomodations") // Filter for accommodations
        .reduce((acc: any, { deductionAmount }: any) => acc + deductionAmount, 0)) * 100
    ) / 100;


    this.totalOthersDeductions = Math.round(
      (deductionSheetData
        .filter(({ deductionCategory }:any) => deductionCategory === "Others") // Filter for accommodations
        .reduce((acc: any, { deductionAmount }: any) => acc + deductionAmount, 0)) * 100
    ) / 100;
  }

  sendEmailToClient(clientEmail: any) {

    this.sendingEmail = true;

    const { client, createdAt, agencyDetails, updatedAt } = this.paySlipIndividualData;
    const processDate = new Date(updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
      deductionSheetData: this.deductionSheetData,
      totalAccomodationsDeduction:this.totalAccomodationDeductions,
      totalOthersDeduction:this.totalOthersDeductions
    };
    this.PaySlipManagementService.sendEmailToClient(emailData).subscribe(({ data, message }: any) => {
      this.sendingEmail = false;
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
    this.PaySlipManagementService.deleteParticularField(payLoad).subscribe(({ data, message }: any) => {
      this.ToastrService[data ? 'success' : 'error'](message);
    })
    this.getAllPaySlips();
  }

  // setNestedValue(obj: any, field: string, value: any): void {
  //   const fields = field.split('.');
  //   let target = obj;
  //   for (let i = 0; i < fields.length - 1; i++) {
  //     target = target[fields[i]];
  //   }
  //   target[fields[fields.length - 1]] = value;
  // }

  setNestedValue(obj: any, field: string, value: any): void {
    const fields = field.split('.');
    let target = obj;
    for (let i = 0; i < fields.length - 1; i++) {
      if (!target[fields[i]]) {
        target[fields[i]] = {};
      }
      target = target[fields[i]];
    }
    target[fields[fields.length - 1]] = value;
  }




}
