import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgencyService } from 'src/app/shared-portal/services/agency-services/agency.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent {
  public agencyForm: any | FormGroup;
  public agencyData:any = [];
  public agencyIndividualData: any;
  public makeMyIdPublic:any;
  public Url = ''
  public toggleUpdateFormValue:Boolean = false;
  public activeSoftDeleteModal:Boolean = false;
  public activeHardDeleteModal:Boolean = false;
  public agencyId:any;
  public totalRecords : number = 0;
  public getDataWithId?: string;
  public cols: any = [];
  public _selectedColumns: any = [];  public clonedAgency: { [s: string]: any } = {};
  // public conversionSaleData: any = [];
  public agencyDialog: boolean = false;

  
  constructor(
    private AgencyManagementService:AgencyService,
    private ToastrService:ToastrService,
    private readonly activateRouter: ActivatedRoute,
    private readonly formbuilder: FormBuilder,
  ) {
    
  }

  ngOnInit(): void {
    this.getAllAgency();
    this.agencyFormIntialization();

      // ---- toggle-column ----- //
      this.cols = [
        { field: 'firstName', header: 'Name' },
        { field: 'contractOwner', header: 'Contract Owner' },
        { field: 'email', header: 'Email Address' },
        { field: 'jobTitle', header: 'Job Title' },
        { field: 'phoneNumber', header: 'Phone Number' },
        { field: 'lifecycleStage', header: 'Life Cycle Stage' },
        { field: 'leadStatus', header: 'Lead Status' },
        { field: 'industry', header: 'Industry' }, 
        { field: 'secondaryEmail', header: 'Secondary Email' }
      ];
  
  
   
      this._selectedColumns = this.cols;
      // ---- toggle-column ----- //
    }
  
    @Input() get selectedColumns(): any[] {
      return this._selectedColumns;
    }
  
    set selectedColumns(val: any[]) {
      //restore original order
      this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
    }


  // public ngAfterViewInit(): void {window.dispatchEvent(new Event('resize'));}

  agencyFormIntialization() {
    this.agencyForm = this.formbuilder.group({
    
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]), 
      lastName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      contractOwner: new FormControl(''),
      jobTitle: new FormControl('' ), 
      lifecycleStage: new FormControl(''),
      leadStatus: new FormControl(''),
      industry: new FormControl(''), 
      secondaryEmail: new FormControl(''),
      phoneNumber: new FormControl(''), 
    })
  }


  getAllAgency(){
    this.AgencyManagementService.getAllAgency().subscribe(({result}:any) =>{
      
       result.forEach((element:any) => {
        if(element.softDelete !== 1){
          this.agencyData.push(element)
          
        }
        
       });
       
    })
  }

  getAgencyById(Id ?: string){
    this.makeMyIdPublic = Id;
    this.AgencyManagementService.getAgencyById(Id).subscribe(({result}:any) => {
      this.agencyIndividualData = result;
    })
  }
  clear(table: any) {
    table.clear()
  }
  openNew() {
    this.agencyData = {};
    this.agencyDialog = true;
    this.agencyData=[];
    this.getAllAgency();

  }
  public toggleUpdateForm() {
    this.toggleUpdateFormValue = !this.toggleUpdateFormValue;
  }

  activeModal(data: { _id: any, modal?: 'hard' | 'soft' }){
    this.agencyId = data._id;
    this.activeSoftDeleteModal = data.modal === 'soft';
    this.activeHardDeleteModal = data.modal === 'hard';
  }

  
  softDeleteAgencyWithId(Id:any){
    this.AgencyManagementService.softDeleteAgencyById(Id).subscribe(({ data, message }: any) => {
      this.ToastrService[data ? 'success' : 'error'](message);
      this.agencyData=[];
      this.getAllAgency();
    })
  }

  hardDeleteAgencyWithId(Id:any){
    this.AgencyManagementService.hardDeleteAgencyById(Id).subscribe(({ data, message }: any) => {
      this.ToastrService[data ? 'success' : 'error'](message);
      this.agencyData=[];
      this.getAllAgency();
    })
  }

  onRowEditInit(initData: any, index: number,) {
    this.clonedAgency[index] = { ...this.agencyData[index] };

  }
  onRowEditCancel(cancelEditingData: any, index: number) {
    this.agencyData[index] = this.agencyData[index];
    delete this.clonedAgency[index];
    this.ToastrService.warning("Cancel-Editing")
  }

  onRowEditSave(saveData: any, index: number) {
    if (saveData.rating > 0) {
      delete this.clonedAgency[index];

    } else {
      // this.ClientManagementService.updateClientById(saveData).subscribe(({ data, message }: any) => {
      //   this.ToastrService[data ? 'success' : 'error'](message);
      //   this.clientsData = [];
      //   this.clientIndividualData = [];
      //   this.getAllClients();
      // })
      this.AgencyManagementService.updateAgencyById(saveData).subscribe(({ data, message }: any) => {
            this.ToastrService[data ? 'success' : 'error'](message);
            this.agencyData = [];
            this.agencyIndividualData = [];
            this.getAllAgency();
          })
    }
  }
  // ---------- Updating-Row-PrimeNG --------- //
  
  // submitAgencyForm(){
  //   const payLoad = { ...this.agencyForm.value, _id: this.makeMyIdPublic };
  //   this.AgencyManagementService.updateAgencyById(payLoad).subscribe(({ data, message }: any) => {
  //     this.ToastrService[data ? 'success' : 'error'](message);
  //     this.agencyData=[];
  //     this.agencyIndividualData = [];
  //     this.getAllAgency();
  //   })
  // }

  submitAgencyForm() {
    let agencyFormData = this.agencyForm.value
    this.AgencyManagementService.addAgency(agencyFormData).subscribe(({ data, message }: any) => {
      this.ToastrService[data ? 'success' : 'error'](message);
      this.agencyForm.reset();
    });
  }
}
