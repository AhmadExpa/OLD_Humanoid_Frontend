import { DynamicMenuService } from 'src/app/shared-portal/services/dynamic-menu/dynamic-menu.service';
import { clientModel } from 'src/app/shared-portal/models/clientModel';
// import { ClientManagementService } from './../../../../../shared-portal/services/client-management.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UmbrellaCompanyManagementService } from 'src/app/shared-portal/services/umbrella-company-management.service';
import { ProductType, Dummy, Fee, } from 'src/app/shared-portal/enums/viewLeadsPricing.enums';
import { DatePipe } from '@angular/common';
import { ClientManagementService } from 'src/app/shared-portal/services/client-management.service';
import { LoginService } from 'src/app/shared-portal/services/login-api/login.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  providers: [DatePipe],
})
export class ClientsComponent implements OnInit {

  @ViewChild('FileSelect') FileSelect: ElementRef | any;
  public clientForm: any | FormGroup;
  public clientsData: clientModel[] = [];
  public agencyOptions: any[] = [];
  public clientData: any = [];
  public clientIndividualData?: clientModel | any;
  public makeMyIdPublic: any;
  public currentUser: any
  public Url = ''
  public getAllUmbrellaServiceData: any = []
  public toggleUpdateFormValue: Boolean = false;
  public activeSoftDeleteModal: Boolean = false;
  public activeHardDeleteModal: Boolean = false;
  public clientId: any;
  public totalRecords: number = 0;
  public imageArray: any;
  // updated-table
  public cols: any = [];
  public _selectedColumns: any = [];
  public clonedClients: { [s: string]: any } = {};
  public clientDialog: boolean = false;
  // updated-table

  public productTypeArray: ProductType[] = [ProductType.NONE, ProductType.PAYE, ProductType.LTD, ProductType.STRATEGY];
  public productTypeArrayUpdated: any[] = ['LTD', 'PAYE', 'STRATEGY'];
  public populateFeeArrayUpdated: any[] = [];
  public populateFeeArray: any = [];
  public LTdValues: any = ['Select', '10£', '15£', '20£', '25£', '30£', '35£', '40£', '45£', '50£', '55£', '60£'];
  public PAYEValues: any = ['Select', '4.99£', '5.99£', '7.99£', '9.99£', '12.99£', '15.99£', '19.99£'];
  public STRATEGYValues: any = ['Select', '60% Retention', '61% Retention', '62% Retention', '63% Retention', '64% Retention', '65% Retention', '66% Retention', '67% Retention', '68% Retention', '69% Retention', '70% Retention', '71% Retention', '72% Retention', '73% Retention', '74% Retention', '75% Retention', '76% Retention', '77% Retention', '78% Retention', '79% Retention', '80% Retention']
  public dummyArray: Dummy[] = [Dummy.Dummy1, Dummy.Dummy2, Dummy.Dummy3];
  public fee: Fee[] = [Fee.ThreePercent, Fee.FourPercent, Fee.FivePercent, Fee.TenPercent, Fee.FifteenPercent];


  constructor(
    private readonly ClientManagementService: ClientManagementService,
    private readonly ToastrService: ToastrService,
    private readonly UmbrellaCompanyService: UmbrellaCompanyManagementService,
    private readonly formbuilder: FormBuilder,
    private readonly loginService: LoginService,
    // private datePipe: DatePipe
  ) {

  }

  ngOnInit(): void {
    this.getAllClients();
    this.clientFormIntialization();
    this.getAllDataOfUmbrellaService();


    // this.updatingFormIntialization();
    this.currentUser = this.loginService.getUserData();
    // ---- toggle-column ----- //
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email Address' },
      { field: 'dob', header: 'DOB' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'productType', header: 'Product Type' },
      { field: 'agency', header: 'Agency' },
      { field: 'marginFee', header: 'Margin Fee' },
      { field: 'businessAndCompanyName', header: 'Business and Company Name' },
      { field: 'insuranceNumber', header: 'Insurance Number' },
      { field: 'addressLineOne', header: 'Address' },
      { field: 'city', header: 'City' },
      { field: 'postCode', header: 'Post Code' },
      { field: 'sortCode', header: 'Sort-Code' },
      { field: 'bankAccountNumber', header: 'Bank Account Number' },
      { field: 'comments', header: 'Comments' },
      { field: 'createdBy', header: 'Created By' },
      { field: 'editedBy', header: 'Edited By' },
    ];



    this._selectedColumns = this.cols;
    // ---- toggle-column ----- //

  }




  // ---- toggle-column ----- //
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
  }
  // ---- toggle-column ----- //



  // public ngAfterViewInit(): void { window.dispatchEvent(new Event('resize')); }


  clientFormIntialization() {
    this.clientForm = this.formbuilder.group({
      titleName: new FormControl('', Validators.required),
      foreName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      surName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      dob: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      addressLineOne: new FormControl('', [Validators.required]),
      addressLineTwo: new FormControl('null'),
      city: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      county: new FormControl('null'),
      postCode: new FormControl('', [Validators.required]),
      insuranceNumber: new FormControl('', [Validators.required]),
      gender: new FormControl('', Validators.required),
      agency: new FormControl('', Validators.required),
      businessAndCompanyName: new FormControl('', Validators.required),
      marginFee: new FormControl('', Validators.required),
      productType: new FormControl('', Validators.required),
      fileValidator: new FormControl(''),
      fileAttachment: new FormControl(''),
      sortCode: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]),
      bankAccountNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(8)]),
      comments: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    })
  }
  public getFile(event: any) {
    const files = event.target.files;
    const filesLength = files.length;
    if (filesLength > 5) {
      this.imageArray = [];
      this.FileSelect.nativeElement.value = null;
      this.ToastrService.error(`Image selection limit is 5 but you have selected ${filesLength}`);
    } else {
      this.imageArray = [...files];
    }
  }
  populateFeeUpdated(selectedProductType: any) {
    switch (selectedProductType) {
      case 'PAYE':
        this.populateFeeArrayUpdated = this.PAYEValues;
        break;
      case 'STRATEGY':
        this.populateFeeArrayUpdated = this.STRATEGYValues;
        break;
      case 'LTD':
      default:
        this.populateFeeArrayUpdated = this.LTdValues;
        break;
    }
  }
  populateFee(data: any) {
    const value = data.target.value;
    switch (value) {
      case 'PAYE':
        this.populateFeeArray = ['Select', '4.99£', '5.99£', '7.99£', '9.99£', '12.99£', '15.99£', '19.99£'];
        break;
      case 'LTD':
        this.populateFeeArray = ['Select', '10£', '15£', '20£', '25£', '30£', '35£', '40£', '45£', '50£', '55£', '60£'];
        break;
      case 'STRATEGY':
        this.populateFeeArray = ['Select', '60% Retention', '61% Retention', '62% Retention', '63% Retention', '64% Retention', '65% Retention', '66% Retention', '67% Retention', '68% Retention', '69% Retention', '70% Retention', '71% Retention', '72% Retention', '73% Retention', '74% Retention', '75% Retention', '76% Retention', '77% Retention', '78% Retention', '79% Retention', '80% Retention'];
        break;
      default:
        this.populateFeeArray = null;
        break;
    }
  }

  updatingFormIntialization() {
    this.clientForm = this.formbuilder.group({
      titleName: new FormControl('', Validators.required),
      foreName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      surName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      dob: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      addressLineOne: new FormControl('', [Validators.required]),
      addressLineTwo: new FormControl(''),
      city: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      county: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      postCode: new FormControl('', [Validators.required]),
      insuranceNumber: new FormControl('', [Validators.required]),
      agency: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      businessAndCompanyName: new FormControl('', Validators.required),
      marginFee: new FormControl('', Validators.required),
      productType: new FormControl('', Validators.required),
      sortCode: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]),
      bankAccountNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(8)]),
      comments: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    })
  }


  getAllClients() {
    this.ClientManagementService.getAllClients().subscribe(({ result }: any) => {
      this.clientsData = result.filter((element: any) => element !== 1)
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



  clear(table: any) {
    table.clear()
  }
  openNew() {
    this.clientData = [];
    this.clientDialog = true;
  }

  getClientById(Id: string) {
    this.makeMyIdPublic = Id;
    this.ClientManagementService.getClientById(Id).subscribe(({ result }: any) => {
      this.clientIndividualData = result;
    })
  }

  // ---------- Updating-Row-PrimeNG --------- //
  onRowEditInit(initData: any, index: number,) {
    this.clonedClients[index] = { ...this.clientsData[index] };
    // const payLoad = { ...this.allConversionSaleData.value, _id: this.makeMyIdPublic };

    //this.clonedProducts[product.id] = { ...product };
  }



  onRowEditCancel(cancelEditingData: any, index: number) {
    this.clientsData[index] = this.clonedClients[index];
    delete this.clonedClients[index];
    this.ToastrService.warning("Cancel-Editing")
  }

  onRowEditSave(saveData: any, index: number) {
    if (saveData.rating > 0) {
      delete this.clonedClients[index];

    } else {
      saveData.editedBy = this.currentUser.firstName;
      this.ClientManagementService.updateClientById(saveData).subscribe(({ data, message }: any) => {
        this.ToastrService[data ? 'success' : 'error'](message);
        this.clientsData = [];
        this.clientIndividualData = [];
        this.getAllClients();
      })
    }
  }
  // ---------- Updating-Row-PrimeNG --------- //

  public toggleUpdateForm() {
    this.toggleUpdateFormValue = !this.toggleUpdateFormValue;
  }

  activeModal(data: { _id: any, modal?: 'hard' | 'soft' }) {
    this.clientId = data._id;
    this.activeSoftDeleteModal = data.modal === 'soft';
    this.activeHardDeleteModal = data.modal === 'hard';
  }

  softDeleteClientWithId(Id: any) {
    this.ClientManagementService.softDeleteClientById(Id).subscribe(({ data, message }: any) => {
      this.ToastrService[data ? 'success' : 'error'](message);
      this.clientsData = [];
      this.getAllClients();
    })
  }

  hardDeleteClientWithId(Id: any) {
    this.ClientManagementService.hardDeleteClientById(Id).subscribe(({ data, message }: any) => {
      this.ToastrService[data ? 'success' : 'error'](message);
      this.clientsData = [];
      this.getAllClients();
    })
  }
  //   clear(table: any) {
  //     table.clear();
  // }


  submitClientForm() {
    let clientValues = new FormData();
    const formControls = ['titleName', 'foreName', 'surName', 'email', 'dob', 'addressLineOne', 'addressLineTwo', 'city','county','postCode', 'insuranceNumber', 'agency', 'gender', 'marginFee', 'productType', 'sortCode', 'bankAccountNumber', 'businessAndCompanyName', 'comments', 'phoneNumber'];
    formControls.forEach(control => {
      clientValues.append(control, this.clientForm.get(control).value);
    });
    // this.imageArray.forEach((image: any) => {
    //   clientValues.append('client-attachment', image);  //Appending values to the getData varibale from FormGroup
    // })
    const createdBy = this.currentUser.firstName;
    clientValues.append('createdBy', createdBy);

    this.ClientManagementService.addClients(clientValues).subscribe(({ data, message }: any) => {
      this.ToastrService[data ? 'success' : 'error'](message);
      this.clientForm.reset();
      this.getAllClients()
    });
  }
}