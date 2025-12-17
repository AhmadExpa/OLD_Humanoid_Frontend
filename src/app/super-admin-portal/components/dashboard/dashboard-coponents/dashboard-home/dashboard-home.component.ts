import { LeadManagementService } from 'src/app/shared-portal/services/lead-management/lead-management.service';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ProductType, Dummy, Fee } from 'src/app/shared-portal/enums/viewLeadsPricing.enums';
import { clientModel } from 'src/app/shared-portal/models/clientModel';
import { ClientManagementService } from 'src/app/shared-portal/services/client-management.service';
import { UmbrellaCompanyManagementService } from 'src/app/shared-portal/services/umbrella-company-management.service';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  countTotalProfiles: any = 120;
  countTotalPendingRequests: any = 0;
  countTotalCompletedRequests: any = 0;
  totalExpiredProfiles: any = 0;
  public tableStyle = { 'min-width': '50rem' };
  public rowsPerPageOptions = [8, 16, 24];
  start: number = 1;
  rowData: any = [];
  @ViewChild('FileSelect') FileSelect: ElementRef | any;
  public clientForm: any | FormGroup;
  public clientsData: clientModel[] = [];
  public agencyOptions: any[] = [];
  public clientData: any = [];
  public clientIndividualData?: clientModel | any;
  public makeMyIdPublic: any;
  public currentUser: any
  public Url = ''
  public isScrolled: boolean = false;
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

  // cards
  public totalClients: any = 0
  public totalLeads: any = 0
  public matureLeads: any = 0
  // cards

  public productTypeArray: ProductType[] = [ProductType.NONE, ProductType.PAYE, ProductType.LTD, ProductType.STRATEGY];
  public productTypeArrayUpdated: any[] = ['LTD', 'PAYE', 'STRATEGY'];
  public populateFeeArrayUpdated: any[] = [];
  public populateFeeArray: any = [];
  public LTdValues: any = ['Select', '10£', '15£', '20£', '25£', '30£', '35£', '40£', '45£', '50£', '55£', '60£'];
  public PAYEValues: any = ['Select', '4.99£', '5.99£', '7.99£', '9.99£', '12.99£', '15.99£', '19.99£'];
  public STRATEGYValues: any = ['Select', '60% Retention', '61% Retention', '62% Retention', '63% Retention', '64% Retention', '65% Retention', '66% Retention', '67% Retention', '68% Retention', '69% Retention', '70% Retention', '71% Retention', '72% Retention', '73% Retention', '74% Retention', '75% Retention', '76% Retention', '77% Retention', '78% Retention', '79% Retention', '80% Retention']
  public dummyArray: Dummy[] = [Dummy.Dummy1, Dummy.Dummy2, Dummy.Dummy3];
  public fee: Fee[] = [Fee.ThreePercent, Fee.FourPercent, Fee.FivePercent, Fee.TenPercent, Fee.FifteenPercent];


  public canvas: any;
  public ctx: any;
  public doughnutCanvas: any;
  public doughnutCtx: any;
  @ViewChild('mychart') mychart: any;
  @ViewChild('piechart') piechart: any;

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    new Chart(this.ctx, {
      type: 'bar',
      data: {
        datasets: [{
          label: 'New Vallue',
          data: [30, 20, 40, 50],
          backgroundColor: "rgba(38, 204, 5, 0.836)",
          borderColor: "#2CE713",
          // fill: true,
        },
        {
          label: 'Current Vallue',
          data: [60, 46, 74, 65],
          backgroundColor: "rgba(136, 243, 115, 0.65)",
          borderColor: "#1EA20D",
          // fill: true,
        },
        {
          label: 'Invested Amount',
          data: [70, 20, 40, 60, 80],
          backgroundColor: "#1EA20D",
          borderColor: "#115208",
          // fill: true,
        },
        {
          type: 'line',
          label: 'Dataset 3',
          backgroundColor: "#47a0e8",
          borderColor: "#007ee7",
          pointStyle: 'circle',
          pointRadius: 10,
          pointHoverRadius: 15,
          fill: true,
          data: [15, 73, 25, 87, 10, 37, 90],
        },
        ],
        labels: ['January 2023', 'February 2023', 'March 2023', 'April 2023']
      },
    });


    this.doughnutCanvas = this.piechart.nativeElement;
    this.doughnutCtx = this.doughnutCanvas.getContext('2d');
    new Chart(this.doughnutCtx, {
      type: 'doughnut',
      data: {
        datasets: [{
          label: 'New Vallue',
          data: [30, 20, 40, 50, 25],
          backgroundColor: ["#56e0c5", "#ffce56", "#ff7d93", "#71DD63", "#449bff"],
          // borderColor: "#2CE713",
          // fill: true,
        },
        ],
        labels: ['January 2023', 'February 2023', 'March 2023', 'April 2023', 'May 2023']
      },
    });
  }


  constructor(
    private ClientManagementService: ClientManagementService,
    private readonly ToastrService: ToastrService,
    private readonly UmbrellaCompanyService: UmbrellaCompanyManagementService,
    private readonly formbuilder: FormBuilder,
  ) {
  }
  ngOnInit(): void {
    this.getAllClients();
    this.clientFormIntialization();
    this.getAllDataOfUmbrellaService();
    // this.updatingFormIntialization();
    // ---- toggle-column ----- //
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email Address' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'productType', header: 'Product Type' },
      { field: 'agency', header: 'Agency' },
      { field: 'marginFee', header: 'Margin Fee' },
      { field: 'businessAndCompanyName', header: 'Business and Company Name' },
      { field: 'sortCode', header: 'Sort-Code' },
      { field: 'bankAccountNumber', header: 'Bank Account Number' },
      { field: 'comments', header: 'Comments' },
      { field: 'createdBy', header: 'Created By' },
      { field: 'editedBy', header: 'Edited By' },
    ];



    this._selectedColumns = this.cols;
    // ---- toggle-column ----- //
  }

  // Client-Table-Code

  // ---- toggle-column ----- //
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
  }
  // ---- toggle-column ----- //
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    this.isScrolled = scrollPosition > 50; console.log(scrollPosition > 50);

  }



  // public ngAfterViewInit(): void { window.dispatchEvent(new Event('resize')); }


  clientFormIntialization() {
    this.clientForm = this.formbuilder.group({
      titleName: new FormControl('', Validators.required),
      foreName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      surName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      agency: new FormControl('', Validators.required),
      businessAndCompanyName: new FormControl('', Validators.required),
      marginFee: new FormControl('', Validators.required),
      productType: new FormControl('', Validators.required),
      fileValidator: new FormControl('', Validators.required),
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
      email: new FormControl('', [Validators.required, Validators.email]),
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
      this.totalClients = this.clientsData.length
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
    const formControls = ['titleName', 'foreName', 'surName', 'email', 'agency', 'gender', 'marginFee', 'productType', 'sortCode', 'bankAccountNumber', 'businessAndCompanyName', 'comments', 'phoneNumber'];
    formControls.forEach(control => {
      clientValues.append(control, this.clientForm.get(control).value);
    });
    this.imageArray.forEach((image: any) => {
      clientValues.append('client-attachment', image);//Appending values to the getData varibale from FormGroup
    })
    const createdBy = this.currentUser.firstName;
    clientValues.append('createdBy', createdBy);

    this.ClientManagementService.addClients(clientValues).subscribe(({ data, message }: any) => {
      this.ToastrService[data ? 'success' : 'error'](message);
      this.clientForm.reset();
      this.getAllClients()
    });
  }
  // Client-Table-Code
}
