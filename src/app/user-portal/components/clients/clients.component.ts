import { clientModel } from 'src/app/shared-portal/models/clientModel';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientManagementService } from 'src/app/shared-portal/services/client-management.service';
import { LocalStorageManagementService } from 'src/app/shared-portal/services/local-storage-management.service';
import { LoginService } from 'src/app/shared-portal/services/login-api/login.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  @ViewChild('FileSelect') FileSelect: ElementRef | any;
  public clientForm: any | FormGroup;
  public clientsData: clientModel[] = [];
  public clientData:any = [];
  public clientIndividualData?: clientModel | any;
  public makeMyIdPublic: any;
  public Url = '';
  public clientEdit:boolean = false
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
  public userRole:any;
  public userData:any;
  // updated-table

  constructor(
    private readonly ClientManagementService: ClientManagementService,
    private readonly ToastrService: ToastrService,
    private readonly formbuilder: FormBuilder,
    private readonly LocalStorageManagementService:LocalStorageManagementService,
    private readonly LoginService:LoginService
  ) {

  }

  ngOnInit(): void {
    this.getUserRole();
    this.getAllClients();
    this.clientFormIntialization();
    this.clientsEditDelOptions()
 
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'businessAndCompanyName', header: 'Business and Company Name' },
      { field: 'email', header: 'Email Address' },
      { field: 'comments', header: 'Comments' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'marginFee', header: 'Margin Fee' },
      { field: 'sortCode', header: 'Sort Code' }, 
      { field: 'bankAccountNumber', header: 'Bank Account Number' }
    ];


 
    this._selectedColumns = this.cols;
    // ---- toggle-column ----- //
  }

  public getUserRole():any{
    const {role} = this.LocalStorageManagementService.getUserRole();
    this.userRole = role;
    this.userData = this.LoginService.getUserData();
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



  public ngAfterViewInit(): void { window.dispatchEvent(new Event('resize')); }


  clientFormIntialization() {
    this.clientForm = this.formbuilder.group({
      titleName: new FormControl('', Validators.required),
      foreName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      surName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      businessAndCompanyName: new FormControl('',Validators.required),
      marginFee: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      fileValidator: new FormControl('', Validators.required),
      fileAttachment: new FormControl(''),
      sortCode: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]),
      bankAccountNumber: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(8)]),
      comments: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      phoneNumber: new FormControl('',[Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
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

  updatingFormIntialization() {
    this.clientForm = this.formbuilder.group({
      titleName: new FormControl('', Validators.required),
      foreName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      surName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      businessAndCompanyName: new FormControl('', Validators.required),
      marginFee: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      sortCode: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]),
      bankAccountNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(8)]),
      comments: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    })
  }
 

  getAllClients() {
    this.ClientManagementService.getAllClients().subscribe(({ result }: any) => {

      const { canAccessCompany } = this.userData;
      this.clientsData = result.filter((client:any) => {
        return canAccessCompany.some((allowAccess:any) => {
          return client.agency === allowAccess.companyName && allowAccess.allow === true;
        });
      });

      this.clientsData = this.clientsData.map((client:any) => {
        if (client.softDelete !== 1) {
          return client
        }
      })
    })
  }


  clientsEditDelOptions() {
    // Retrieve the user data from localStorage
    const userDataString = localStorage.getItem('user-data');
  
    // Check if user data exists in localStorage
    if (userDataString) {
      const userData = JSON.parse(userDataString);
  
      // Now, you can access userData in this function
      
      // You can also check the user's role from userData and set canEdit accordingly
      if (userData.role === 'admin') {
        this.clientEdit = userData.canEdit = true;
      } else {
        this.clientEdit = false;
      }
    } 
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
    // console.log(saveData);
    // console.log('Edit Save Event Called');
    if (saveData.rating > 0) {
      delete this.clonedClients[index];

    } else {
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

submitClientForm() {
  let clientValues = new FormData();
  const formControls = ['titleName', 'foreName', 'surName', 'email', 'gender', 'marginFee', 'sortCode', 'bankAccountNumber', 'businessAndCompanyName', 'comments', 'phoneNumber'];
  formControls.forEach(control => {
    clientValues.append(control, this.clientForm.get(control).value);
  });
  this.imageArray.forEach((image: any) => {
    clientValues.append('client-attachment', image);//Appending values to the getData varibale from FormGroup
  })
  this.ClientManagementService.addClients(clientValues).subscribe(({ data, message }: any) => {
    this.ToastrService[data ? 'success' : 'error'](message);
    this.clientForm.reset();
  });
}
}
