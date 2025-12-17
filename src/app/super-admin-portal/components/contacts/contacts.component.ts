import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegistrationThroughEmailService } from 'src/app/shared-portal/services/registration-through-email/registration-through-email.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent{
  public getCompliancePackData: any = []
  public getIdCompliancePackData: any = []
  public FromRegistrationThroughEmailId: any;
  public activeSoftDeleteModal: Boolean = false;
  public activeHardDeleteModal: Boolean = false;
  public Url = '/';
  public cols: any = [];
  public _selectedColumns: any = [];
  public dropdownStatusOption: any = [];
  public clonedContactData: { [s: string]: any } = {}


  constructor(
    private readonly ToastrService: ToastrService,
    private readonly registrationThroughEmailService: RegistrationThroughEmailService,
  ) {
    this.getAllDataFromRegistrationThroughEmailForm();
  }

  ngOnInit():void{
    
    this.cols = [
      { field: 'foreName', header: 'Name' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'email', header: 'Email' },
      { field: 'status', header: 'Status' },
      { field: 'foreName', header: 'Agent Name' },
      { field: 'phoneNumber', header: 'Agent Number' },
     


    ];
    this._selectedColumns = this.cols;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
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

  getSeverity(status: any | null): 'success' | 'info' | 'warning' | 'danger' | 'unknown' {
    if (status === null) {
      return 'unknown'; // or any other default severity you want
    }
    else {
      switch (status) {
        case 'unqualified':
          return 'danger';

        case 'New':
          return 'info';

        case 'Pending':
          return 'warning';

        case 'Confirmed':
          return 'success';

        case 'Cancelled':
          return 'danger';

        default:
          return 'unknown';
      }
    }
  }

  onRowEditSave(saveData: any, index: number) {
    if (saveData.rating > 0) {
      delete this.clonedContactData[index];
  
    } else {
      this.registrationThroughEmailService.registrationThroughEmailUpdataFormData(saveData).subscribe(({ data, message }: any) => {
        this.ToastrService[data ? 'success' : 'error'](message);
        this.getCompliancePackData = [];
        this.getIdCompliancePackData = [];
        this.getAllDataFromRegistrationThroughEmailForm();
      })
    }
  }

  onRowEditInit(initData: any, index: number,) {
    this.clonedContactData[index] = { ...this.getCompliancePackData[index] };
  }

  onRowEditCancel(cancelEditingData: any, index: number) {
    this.getCompliancePackData[index] = this.clonedContactData[index];
    delete this.clonedContactData[index];
    this.ToastrService.warning("Cancel-Editing")
  }

  getAllDataFromRegistrationThroughEmailForm() {
    this.registrationThroughEmailService.registrationThroughEmailGetAllData().subscribe(({ result, message }: any) => {


      this.getCompliancePackData = result.filter((res: any) => res.status === 0)
      
    })
  }
  getIdDataFromRegistrationThroughEmailForm(ID: any) {
    this.registrationThroughEmailService.registrationThroughEmailGetIdData(ID).subscribe(({ result}: any) => {
      this.getIdCompliancePackData = result
      
    })
  }

  activeModal(data: { _id: any, modal?: 'hard' | 'soft' }) {
    this.FromRegistrationThroughEmailId = data._id;
    this.activeSoftDeleteModal = data.modal === 'soft';
    this.activeHardDeleteModal = data.modal === 'hard';
  }

  softDeleteIdFromRegistrationThroughEmailForm(Id: any) {
    this.registrationThroughEmailService.registrationThroughEmailSoftDeleteIdData(Id).subscribe(({ data, message }: any) => {
      this.ToastrService[data ? 'warning' : 'error'](message);
      this.getAllDataFromRegistrationThroughEmailForm();
    })
  }

  deleteIdDataFromRegistrationThroughEmailForm(Id: any) {
    this.registrationThroughEmailService.registrationThroughEmailDeleteIdData(Id).subscribe(({ data, message }: any) => {
      this.ToastrService[data ? 'success' : 'error'](message);
      this.getAllDataFromRegistrationThroughEmailForm();
    })
  }
}



