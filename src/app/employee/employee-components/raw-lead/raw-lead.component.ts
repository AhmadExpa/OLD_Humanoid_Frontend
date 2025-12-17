import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ToastrService } from 'ngx-toastr';
import { RawLeadService } from 'src/app/shared-portal/services/super-admin-service/raw-lead.service';

@Component({
  selector: 'app-raw-lead',
  templateUrl: './raw-lead.component.html',
  styleUrls: ['./raw-lead.component.css'],
})
export class RawLeadComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
  });
  secondFormGroup: any = this._formBuilder.group({
    name: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    status: ['', Validators.required],
  });
  isLinear = false;
  rawLeads: any[] = [];
  showcard = false;
  // showRow = 
  selectedLead: object | any = {};
  delayLead=false;
  statusOptions = [
    { name: 'Approved', value: 'Approved' },
    { name: 'Immediate HangUp', value: 'Immediate HangUp' },
    { name: 'Call me Later', value: 'Call me Later' },
    { name: 'No Response', value: 'No Response' },
  ];
  constructor(
    private _formBuilder: FormBuilder,
    private rawLeadService: RawLeadService,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.rawLeads.length);
    
    this.getLead();
    // this.rawLeadService.getRandomLead().subscribe((res: any) => {
    //   console.log(res);
    //   this.rawLeads.push(res.data)
    //   console.log(this.rawLeads);
    // });
  }

  getLead() { 
 
    this.rawLeadService.getDelayedLead().subscribe((res: any) => {
      console.log(res);
      if (res.data?.length > 0) {
        this.rawLeads = [];
        this.delayLead=true;
        this.rawLeads.push(res.data[0]);
        this.showcard = true;
      } else {
        this.rawLeadService.getRandomLead().subscribe((res: any) => {
          console.log('this is running too');
          this.rawLeads = [];
          this.delayLead=false;
          if(res.data){
          this.rawLeads.push(res.data);
          this.showcard = true;
          }
        });
      }
    });
  }

  nextOption(lead: any) {
    console.log(lead);
    this.selectedLead = lead;
    console.log(this.selectedLead);
  }

  changeStatus(id: any) {
    const status = this.secondFormGroup.get('status')?.value?.value;
    console.log(id, status);
    this.rawLeadService.changeStatus(id, status).subscribe((res: any) => {
      this.toasterService[res.data ? 'success' : 'error'](res.message);
    });
  }


  resetAndGetLead(){
this.showcard=false
    this.getLead();

    this.stepper.reset();
  }
}
