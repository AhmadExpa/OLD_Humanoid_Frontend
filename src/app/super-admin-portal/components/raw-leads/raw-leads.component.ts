import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUpload } from 'primeng/fileupload';
import { RawLeadService } from 'src/app/shared-portal/services/super-admin-service/raw-lead.service';

@Component({
  selector: 'app-raw-leads',
  templateUrl: './raw-leads.component.html',
  styleUrls: ['./raw-leads.component.css']
})
export class RawLeadsComponent {
  RawLeadsFiles: any = [];
  progressBar = false;
  uploadLead = false;
  createNewLead = false;
  leadsListing = false;
  leads:any=[]
  cols!: any[];
  selectedColumns!: any[];
  severity = 'success';
  tagValue = 'Success';
  @ViewChild('fileUpload') fileUpload: FileUpload | any;

  rawLeadForm: FormGroup | any;
  constructor(
    private rawLeadsService: RawLeadService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private toasterService: ToastrService
  ) {
    this.formBuilder();
  }

  ngOnInit(){
    this.getAllLeads()
    this.cols = [
      { field: '_id', header: '#Id' },
      { field: 'name', header: 'Name' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'status', header: 'Status' },
      { field: 'assignedTo', header: 'Assigned To' },
      { field: 'updatedAt', header: 'Assigning At' },
    ];
    this.selectedColumns = this.cols;
  }

  formBuilder() {
    this.rawLeadForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d+$/)]],
    });
  }

  getAllLeads(){
    this.rawLeadsService.getAllLeads().subscribe((res:any)=>{
      this.leads = res?.data
    })
  }


  onUpload(Event: any) {
    this.progressBar = true;
    const formData = new FormData();
    for (let file of Event.files) {
      formData.append('RawLeadsFiles', file);
    }

    this.rawLeadsService.uploadRawLeads(formData).subscribe(
      (res: any) => {
        if (res.data === true) {
          this.toasterService[res.data ? 'success' : 'error'](res.message);

          this.RawLeadsFiles = [...Event.files];
          this.severity = 'success';
          this.tagValue = 'Success';
          this.fileUpload.clear();
          this.progressBar = false;
        }
      },
      (err: any) => {
        // Handle upload error
        this.toasterService['error'](err.message);

        this.RawLeadsFiles = [...Event.files];
        // this.fileUpload.clear();
        this.progressBar = false;
        this.severity = 'danger';
        this.tagValue = 'upload Failed';
      }
    );
  }

  onFileSelected(event: Event | any) {

  }

  createLead() {
    if (this.rawLeadForm.invalid) {
      return;
    }
    const payload = {
      name: this.rawLeadForm.value.name,
      phoneNumber: this.rawLeadForm.value.phoneNumber,
    };
    this.rawLeadsService.createRawLeads(payload).subscribe(
      (res: any) => {
        this.toasterService[res.data ? 'success' : 'error'](res.message);
        this.rawLeadForm.reset();
      },
      (err: any) => {
        this.toasterService['error'](err.message);
      }
    );
  }
}
