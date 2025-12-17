import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PdfStatusE } from 'src/app/shared-portal/enums/emailStatusEnum.enum';
import { Dummy, Fee, ProductType } from 'src/app/shared-portal/enums/viewLeadsPricing.enums';
import { LeadManagementService } from 'src/app/shared-portal/services/lead-management/lead-management.service';
import { SignatureServicesService } from 'src/app/shared-portal/services/signature/signature-services.service';
import { UmbrellaCompanyManagementService } from 'src/app/shared-portal/services/umbrella-company-management.service';


@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent{

  public LeadForm: FormGroup | any;
  public getAllLeadData:any=[];
  public getPdfStatus :any = [];
  pdfStatusArray:any = []
  public getLeadDataOfId:any=[];
  public makeMyIdPublic:any
  public UpdatedLeadForm: FormGroup | any;
  public getAllUmbrellaServiceData: any[] = [];
  public leadsId:any;
  public productTypeArray:  ProductType[] = [ProductType.NONE ,ProductType.PAYE, ProductType.LTD, ProductType.STRATEGY];
  public dummyArray: Dummy[] = [Dummy.Dummy1, Dummy.Dummy2, Dummy.Dummy3];
  public fee: Fee[] = [Fee.ThreePercent, Fee.FourPercent, Fee.FivePercent, Fee.TenPercent, Fee.FifteenPercent];
  public toggleUpdateFormValue:Boolean = false;

  public LTdValues:any = ['Select','3% @ €30','4% @ €40','5% @ €50','Straight €40','Straight €30','Straight €50','Straight €60','Straight €70','Straight €80'];
  public PAYEValues:any = ['Select','€4.99','€5.99','€7.99','€9.99','€12.99','€15.99','€19.99'];
  public STRATEGYValues:any = ['Select','60% Retention','61% Retention','62% Retention','63% Retention','64% Retention','65% Retention','66% Retention','67% Retention','68% Retention','69% Retention','70% Retention','71% Retention','72% Retention','73% Retention','74% Retention','75% Retention','76% Retention','77% Retention','78% Retention','79% Retention','80% Retention']
  public populateFeeArray:any = ["10","20","30"];
  public cols: any = [];
  public _selectedColumns: any = [];
  public dropdownStatusOption: any = [];
  public clonedLeadData: { [s: string]: any } = {};
  public activeSoftDeleteModal: Boolean = false;
  public activeHardDeleteModal: Boolean = false;
  public leadDialog: boolean = false;
  public leadSeverity:any[]=[];

  constructor(
    private readonly addLeadManagementService: LeadManagementService,
    private readonly ToastrService: ToastrService,
    private readonly formBuilder: FormBuilder,
    private readonly signatureServicesService:SignatureServicesService,
    private readonly UmbrellaCompanyService: UmbrellaCompanyManagementService,
    private readonly router:Router,
  ){
    this.getAllDataOfLead()
    this.initializeLeadForm();
    this.getAllDataOfUmbrellaService()
    // this.initializeupdatedLeadForm();
  }

  ngOnInit(): void {


    this.cols = [
      { field: 'foreName', header: 'Name' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'email', header: 'Email' },
   
      { field: 'pdfStatus', header: 'Status' },
      // { field: 'foreName', header: 'Agent Name' },
      // { field: 'phoneNumber', header: 'Agent Number' },
     


    ];
    this._selectedColumns = this.cols;

  }
  set selectedColumns(val: any[]) {
  
    this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  initializeLeadForm() {
    this.LeadForm = this.formBuilder.group({
      foreName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      surName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      agency: new FormControl('', Validators.required),
      productType: new FormControl('', Validators.required),
      fee: new FormControl('',Validators.required),
      salesExecutive: new FormControl('', Validators.required),
      dateTime: new FormControl(''),
      industry: new FormControl(''),
      leadStatus: new FormControl(''),
      leadConfirmed: new FormControl(''),
      leadOwner: new FormControl(''),
      acountName: new FormControl(''),
    })
  }

  getAllDataOfUmbrellaService() {
    this.UmbrellaCompanyService.getUmbrellaCompanyFormData().subscribe(({result}:any) => {
      this.getAllUmbrellaServiceData = result;
    })
  }

 
  getOptions(field: string): any[] {
    if (field === 'status') {
      return this.dropdownStatusOption;
    }
    else {
      // Return an empty array or handle other fields as needed
      return [];
    }
  }

  getAllDataOfLead() {
    this.addLeadManagementService.getLeads().subscribe(({ result }: any) => {
      this.getAllLeadData = result.filter((res: any) => res.status === 0);
      this.getPdfStatus = this.getAllLeadData.map((leadData: any) => leadData.pdfStatus);
       this.getAllStatusData()
    });
  }

  getAllStatusData() {
    const statusObj: { [key: string]: string } = {
        'ZERO': '0',
        'ONE': 'Sent',
        'TWO': 'Opened',
        'THREE': 'Verrified',
    };

    this.getPdfStatus = this.getPdfStatus.map((status: any) => statusObj[status] ?? status);
}
  
  getStatusLabel(pdfStatus: PdfStatusE | any): string {
    if (pdfStatus === PdfStatusE.ZERO) {
      return '0';
    } else if (pdfStatus === PdfStatusE.ONE) {
      return 'Sent';
    } else if (pdfStatus === PdfStatusE.TWO) {
      return 'Opened';
    } else if (pdfStatus === PdfStatusE.THREE) {
      return 'Verrified';
    } else {
      return 'Unknown';
    }
  }



  
  getSeverity(pdfStatus: PdfStatusE | any): 'success' | 'info' | 'warning' | 'danger' | 'unknown' {
    if (pdfStatus === PdfStatusE.ZERO) {
      return 'danger';
    } else if (pdfStatus === PdfStatusE.ONE) {
      return 'info';
    } else if (pdfStatus === PdfStatusE.TWO) {
      return 'warning';
    } else if (pdfStatus === PdfStatusE.THREE) {
      return 'success';
    } else {
      return 'unknown';
    }
  }
  
  
  
  


  onRowEditSave(saveData: any, index: number) {
    // console.log(saveData);
    // console.log('Edit Save Event Called');
    if (saveData.rating > 0) {
      delete this.clonedLeadData[index];
  
    } else {
      this.addLeadManagementService.updateLeadFormData(saveData).subscribe(({ data, message }: any) => {
        this.ToastrService[data ? 'success' : 'error'](message);
        this.getAllLeadData = [];
        this.getLeadDataOfId = [];
        this.getAllDataOfLead();
      })
    }
  
  
  
  }

  onRowEditInit(initData: any, index: number,) {
    // console.log(initData);
    // console.log('Edit Init Event Called');
    this.clonedLeadData[index] = { ...this.getLeadDataOfId[index] };
    // const payLoad = { ...this.allConversionSaleData.value, _id: this.makeMyIdPublic };

    //this.clonedProducts[product.id] = { ...product };
  }



  onRowEditCancel(cancelEditingData: any, index: number) {
    this.getLeadDataOfId[index] = this.clonedLeadData[index];
    delete this.clonedLeadData[index];
    this.ToastrService.warning("Cancel-Editing")
  }

  activeModal(data: { _id: any, modal?: 'hard' | 'soft' }) {
    this.getLeadDataOfId = data._id;
    
    this.activeSoftDeleteModal = data.modal === 'soft';
    this.activeHardDeleteModal = data.modal === 'hard';
  }


  
 

  

  initializeupdatedLeadForm() {
    this.UpdatedLeadForm = this.formBuilder.group({
      foreName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      surName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      agency: new FormControl('', Validators.required),
      productType: new FormControl('', Validators.required),
      fee: new FormControl('', Validators.required),
      salesExecutive: new FormControl('', Validators.required),
      dateTime: new FormControl(''),
      industry: new FormControl(''),
      leadStatus: new FormControl(''),
      leadConfirmed: new FormControl(''),
      leadOwner: new FormControl(''),
      acountName: new FormControl(''),
    })
  }

 
  getLeadDataWithId(id:string){
    this.makeMyIdPublic = id;
    this.addLeadManagementService.getLeadIdData(id).subscribe(({result}:any)=>{
      this.getLeadDataOfId = result
      this.UpdatedLeadForm = this.formBuilder.group({
        foreName: new FormControl(this.getLeadDataOfId?.foreName),
        surName: new FormControl(this.getLeadDataOfId?.surName),
        email: new FormControl(this.getLeadDataOfId?.email),
        phoneNumber: new FormControl(this.getLeadDataOfId?.phoneNumber),
        agency: new FormControl(this.getLeadDataOfId?.agency),
        productType: new FormControl(this.getLeadDataOfId?.productType),
        fee: new FormControl(this.getLeadDataOfId?.fee),
        salesExecutive: new FormControl(this.getLeadDataOfId?.salesExecutive),
        dateTime: new FormControl(this.getLeadDataOfId?.dateTime),
        industry: new FormControl(this.getLeadDataOfId?.industry),
        leadStatus: new FormControl(this.getLeadDataOfId?.leadStatus),
        leadConfirmed: new FormControl(this.getLeadDataOfId?.leadConfirmed),
        leadOwner: new FormControl(this.getLeadDataOfId?.leadOwner),
        acountName: new FormControl(this.getLeadDataOfId?.acountName),
      })
    })
    this.router.navigate(['/super-admin-portal/leads/view-leads/leadInfo' ,id])
  }

 

  populateFee(data:any){
    const value = data.target.value;
    switch (value) {
      case 'PAYE':
        this.populateFeeArray = this.PAYEValues || value;
        break;
      case 'LTD':
        this.populateFeeArray = this.LTdValues || value;
        break;
      case 'STRATEGY':
        this.populateFeeArray = this.STRATEGYValues || value;
        break;
      default:
        this.populateFeeArray = null;
    }
  }

  public toggleUpdateForm() {
    this.toggleUpdateFormValue = !this.toggleUpdateFormValue;
  }
  clear(table: any) {
    table.clear()
  }
  openNew() {
    this.getAllLeadData = [];
    this.leadDialog = true;
    this.getAllDataOfLead();
    
  }


  deleteLeadDataWithId(_id:any){
     this.addLeadManagementService.deleteLeadIdData(_id).subscribe(({message}:any)=>{
      this.ToastrService.error(message)
      this.getAllDataOfLead()
     })
  }
  softDeleteLeadDataWithId(Id: any) {

    this.addLeadManagementService.softDeleteLeadIdData(Id).subscribe(({ data, message }: any) => {
      this.ToastrService[data ? 'warning' : 'error'](message);
      this.getAllDataOfLead();
    })
  }

  submitUpdatedLeadForm(){
    let payLoad = this.UpdatedLeadForm.value;
    payLoad['_id'] = this.makeMyIdPublic;
    this.addLeadManagementService.updateLeadFormData(payLoad).subscribe(({message}:any)=>{
      this.ToastrService.success(message);
      this.getLeadDataWithId(this.makeMyIdPublic);
    })
  }

  sendCompliancePackThroughEmail(payLoad:any){
    this.addLeadManagementService.sendCompliancePackThroughEmail(payLoad).subscribe(({body,message,data}:any)=>{
      this.ToastrService[data ? 'success' : 'error'](message);
      this.getAllDataOfLead()
      this.getAllDataOfUmbrellaService()
    })
  }
  sendEmail(){
    const data = this.LeadForm.value
    this.sendCompliancePackThroughEmail(data)
    this.LeadForm.reset();
 
  }
  submitLeadForm() {
    const data = this.LeadForm.value
    const {phoneNumber} = data
    console.log(phoneNumber);
    this.signatureServicesService.setPhoneNumber(phoneNumber)
    this.addLeadManagementService.addLeads(data).subscribe((res:any)=>{
     this.ToastrService.success(res.message);
     this.getAllDataOfLead()
     this.getAllDataOfUmbrellaService()
     this.leadDialog = false
    })
    
  }
}
