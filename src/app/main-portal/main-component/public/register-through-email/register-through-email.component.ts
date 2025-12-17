import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegistrationThroughEmailService } from 'src/app/shared-portal/services/registration-through-email/registration-through-email.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-through-email',
  templateUrl: './register-through-email.component.html',
  styleUrls: ['./register-through-email.component.css']
})
export class RegisterThroughEmailComponent implements OnInit {
  public registerThroughLeadForm: FormGroup | any;
  public proofAddressOne: any;
  public proofAddressTwo: any;
  public passportPicture: any;
  public companyName: any;

  constructor(
    private readonly FormBuilder: FormBuilder,
    private readonly ToasterService: ToastrService,
    private readonly RegistrationThroughEmailService: RegistrationThroughEmailService,
    private readonly ActivatedRoute: ActivatedRoute
  ) {
    this.initializeRegisterThroughLeadForm()
  }

  ngOnInit(): void {
    this.companyName = this.ActivatedRoute.snapshot.paramMap.get('companyName');
  }

  initializeRegisterThroughLeadForm() {
    this.registerThroughLeadForm = this.FormBuilder.group({
      foreName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      surName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      address1: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 !@#$%^&*()-_+=|\\{}\[\]:;'",.<>]*$/)]),
      address2: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 !@#$%^&*()-_+=|\\{}\[\]:;'",.<>]*$/)]),
      city: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]),
      postalCode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      dob: new FormControl('', [Validators.required]),
      nationalNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      accountHolderName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      nameOfBank: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      accountNumber: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      sortCode: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]),
      select1FromABC: ['', Validators.required],
      studentLoanRepaid: ['', Validators.required],
      typeOfStudentLoan: ['', Validators.requiredTrue],
      repayingLoan: ['', Validators.required],
      finishStudiesBefore6thApril: ['', Validators.required],
      fileValidator: new FormControl('', Validators.required),
      fileValidator1: new FormControl('', Validators.required),
      fileValidator2: new FormControl('', Validators.required),
    })
  }

  getFile1(event: any) {
    [this.proofAddressOne] = event.target.files;
  }

  getFile2(event: any) {
    [this.proofAddressTwo] = event.target.files;
  }
  getFile3(event: any) {
    [this.passportPicture] = event.target.files;
  }

  submitForm() {
    const payLoad = new FormData();
    const formControls = [
      'foreName', 'surName', 'address1', 'address2', 'city', 'postalCode', 'dob', 'nationalNumber', 'email', 'phoneNumber', 'accountHolderName', 'nameOfBank', 'accountNumber', 'sortCode', 'select1FromABC', 'studentLoanRepaid', 'typeOfStudentLoan', 'finishStudiesBefore6thApril', 'repayingLoan'
    ]

    formControls.forEach(control => {
      payLoad.append(control, this.registerThroughLeadForm.get(control).value);
    })

    payLoad.append('agency',this.companyName);
    payLoad.append('proofAddressOne', this.proofAddressOne);
    payLoad.append('proofAddressTwo', this.proofAddressTwo);
    payLoad.append('passportPicture', this.passportPicture);

    // this.registrationThroughEmailService.sendSignatureRequestThroughRegistration(email).subscribe(({body,message}:any)=>{
    //   this.Toaster.success(message);
    //   this.DummyForm.reset();
    // })

    this.RegistrationThroughEmailService.registrationThroughEmailSaveAllData(payLoad).subscribe(({message,data}:any)=>{
      this.ToasterService[data ? 'success' : 'error'](message);
      this.registerThroughLeadForm.reset();
    })
  }

}
