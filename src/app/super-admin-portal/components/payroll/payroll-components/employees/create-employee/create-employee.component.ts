import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PayrollService } from 'src/app/shared-portal/services/payroll-management/payroll.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  // calling output decorator for stateMangement for this component
  @Output() employeeInfo = new EventEmitter<any>();
  public getAllEmployeesData: any = [];
  formControlName = 'ali hassan';
  countries = [{ name: 'Pakistan' }, { name: 'India' }, { name: 'Iran' }];
  paymentMethods = [
    { name: 'cash' },
    { name: 'cheque' },
    { name: 'Bank Transfer' },
  ];

  startingBasics = [
    { name: 'This is an existing employee' },
    { name: 'Employee Declaration:P45-Select category Below' },
    { name: 'Employee Declaration:P46-Select category Below' },
  ];

  circumstances = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
  niCategory = [
    { name: 'A (Over 21 Standard Rate)' },
    { name: 'B (Female Reduced Rate)' },
    { name: 'C (Over State Pension Age)' },
    { name: 'J (Over 21 Deferred Rate)' },
    { name: 'M (Under 21 Standard Rate)' },
    { name: 'Z (Under 21 Deferred Rate)' },
    { name: 'H (Apprentice Under 25)' },
    { name: 'F (Freeport Standard Rate)' },
    { name: 'I (Freeport married woman’s reduced rate election (MWRRE))' },
    { name: 'S (Freeport over state pension age)' },
    { name: 'L (Freeport deferment)' },
    { name: 'V (Veterans Standard Rate)' },
    { name: 'N (Investment Zone Standard Rate)' },
    {
      name: 'E (Investment Zone married woman’s reduced rate election (MWRRE))',
    },
    { name: 'K (Investment Zone over state pension age)' },
    { name: 'D (Investment Zone deferment)' },
  ];

  directorShipStarted = [
    { name: 'Before 6/04/2024' },
    { name: 'On or After 6/04/2024' },
  ];
  createEmployeeForm!: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private readonly payrollService: PayrollService,
    private toasterService: ToastrService
  ) {
    this.formBuilder();
    // console.log(this.employeeFormControl);
  }

  ngOnInit(): void {
    // console.log('changedddd');
  }

  // Adding and removing form controls Conditionally based on other control values
  // Doing this for validation because I want to disable submit button if any of the displayed form fields are invalid

  onPaymentMethodChange(event: Event | any) {
    // console.log(event);

    const paymentMethod = event.value.name;
    if (paymentMethod === 'Bank Transfer') {
      this.addFormControl('bankAccountNumber', true);
      this.addFormControl('bankAc', true);
      this.addFormControl('sortCode', true);
      // console.log(this.createEmployeeForm);
    } else {
      this.removeFormControl('bankAccountNumber');
      this.removeFormControl('bankAc');
      this.removeFormControl('sortCode');

      // console.log(this.createEmployeeForm);
    }
    this.createEmployeeForm.updateValueAndValidity();
  }

  isADirector(event: Event | any) {
    // console.log(event);

    const paymentMethod = event.checked;
    if (paymentMethod) {
      this.addFormControl('directorShipStarted', true);
      this.addFormControl('prefferedCalcMethod', true);

      // console.log(this.createEmployeeForm);
    } else {
      this.removeFormControl('directorShipStarted');
      this.removeFormControl('prefferedCalcMethod');

      // console.log(this.createEmployeeForm);
    }
    this.createEmployeeForm.updateValueAndValidity();
  }

  onDirectorShipStartedChange(event: Event | any) {
    // console.log(event);

    const paymentMethod = event.value.name;
    if (paymentMethod === 'On or After 6/04/2024') {
      this.addFormControl('enterSpecificDate', true);

      // console.log(this.createEmployeeForm);
    } else {
      this.removeFormControl('enterSpecificDate');

      // console.log(this.createEmployeeForm);
    }
    this.createEmployeeForm.updateValueAndValidity();
  }

  onReceivedByMethodChange(event: Event | any) {
    // console.log(event);
    const receivedBy = event.value;
    if (receivedBy === 'print') {
      this.removeFormControl('emailPassword');
      // console.log(this.createEmployeeForm);
    } else if (receivedBy === 'email') {
      this.addFormControl('emailPassword', true);
      // console.log(this.createEmployeeForm);
    }
    this.createEmployeeForm.updateValueAndValidity();
  }

  onStartingBasisChange(event: Event | any) {
    // console.log(event);

    const paymentMethod = event.value.name;

    if (paymentMethod === 'Employee Declaration:P45-Select category Below') {
      this.addFormControl('niCategory', true);
      this.addFormControl('taxCode', true);
      this.addFormControl('week1Month1', false);

      this.addFormControl('circumstances', true);
      this.addFormControl('leavingDate', false);
      this.addFormControl('finalPayPeriod', true);
      this.addFormControl('customFinalPayPeriod', false);
      this.addFormControl('totalPaytoDate', false);
      this.addFormControl('totalTaxtoDate', false);
      this.addFormControl('studentLoan', true);
      this.addFormControl('postGraduateLoan', true);
      console.log(this.createEmployeeForm);
      this.createEmployeeForm.updateValueAndValidity();
    } else if (paymentMethod === 'This is an existing employee') {
      this.createEmployeeForm.updateValueAndValidity();
      console.log(this.createEmployeeForm);

      this.addFormControl('niCategory', true);
      this.addFormControl('taxCode', true);
      this.addFormControl('week1Month1', false);

      this.removeFormControl('circumstances');

      this.removeFormControl('finalPayPeriod');
      this.removeFormControl('customFinalPayPeriod');
      this.removeFormControl('totalPaytoDate');
      this.removeFormControl('totalTaxtoDate');
      this.removeFormControl('studentLoan');
      this.removeFormControl('postGraduateLoan');
    } else if (
      paymentMethod === 'Employee Declaration:P46-Select category Below'
    ) {
      this.addFormControl('circumstances', true);
      this.addFormControl('niCategory', true);
      this.addFormControl('studentLoan', true);
      this.addFormControl('postGraduateLoan', true);

      this.removeFormControl('taxCode');
      this.removeFormControl('week1Month1');
      this.removeFormControl('leavingDate');
      this.removeFormControl('finalPayPeriod');
      this.removeFormControl('customFinalPayPeriod');
      this.removeFormControl('totalPaytoDate');
      this.removeFormControl('totalTaxtoDate');
    } else {
      this.removeFormControl('niCategory');
      this.removeFormControl('taxCode');
      this.removeFormControl('week1Month1');
      this.removeFormControl('circumstances');
      this.removeFormControl('leavingDate');
      this.removeFormControl('finalPayPeriod');
      this.removeFormControl('customFinalPayPeriod');

      this.removeFormControl('totalPaytoDate');
      this.removeFormControl('totalTaxtoDate');
      this.removeFormControl('studentLoan');
      this.removeFormControl('postGraduateLoan');

      // console.log(this.createEmployeeForm);
    }
    console.log(this.createEmployeeForm);
    this.createEmployeeForm.updateValueAndValidity();
    console.log(this.createEmployeeForm);
  }

  onNiCategoryChange(event: Event | any) {
    // console.log(event);

    const paymentMethod = event.value.name;
    if (paymentMethod === 'V (Veterans Standard Rate)') {
      this.addFormControl('firstDateofCivilianEmployment', true);

      // console.log(this.createEmployeeForm);
    } else {
      this.removeFormControl('firstDateofCivilianEmployment');

      // console.log(this.createEmployeeForm);
    }
    this.createEmployeeForm.updateValueAndValidity();
  }

  private formBuilder() {
    this.createEmployeeForm = this.fb.group({
      // PersonalDetails
      foreName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]*$/),
      ]),
      surName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]*$/),
      ]),
      niNumber: new FormControl(''),
      dob: new FormControl('', Validators.required),

      gender: new FormControl('', Validators.required),
      // Contact details
      address1: new FormControl(''),
      address2: new FormControl(''),
      city: new FormControl('', [Validators.pattern(/^[a-zA-Z ]*$/)]),
      postCode: new FormControl(''),
      country: new FormControl(''),
      telephone: new FormControl('', [Validators.pattern(/^\+?\d+$/)]),
      // employment details
      payCycle: new FormControl('', Validators.required),
      contractedWeeklyHours: new FormControl(''),
      worksNumber: new FormControl(''),
      rtiPayId: new FormControl(''),
      startDate: new FormControl('', [
        Validators.required,
        this.dateRangeValidator,
      ]),
      endDate: new FormControl('', this.dateRangeValidator),
      paymentMethod: new FormControl('', Validators.required),

      //controls when Bank transfer method will be selected by the client
      // bankAccountNumber: new FormControl('', [Validators.required,Validators.pattern(/^\d{8,20}$/)]),
      // bankAc: new FormControl(''),
      // sortCode: new FormControl('', Validators.required),

      autoIncrement: new FormControl(false),
      deemedEmployee: new FormControl(false),

      isDirector: new FormControl(false),
      // directorShipStarted: new FormControl('', Validators.required),
      // prefferedCalcMethod: new FormControl('', Validators.required),
      // enterSpecificDate: new FormControl('', Validators.required),

      receivedBy: new FormControl('email', Validators.required),
      // if received by email
      emailPassword: new FormControl('', Validators.required),
      // if received by email

      email: new FormControl('', Validators.required),
      // previous Tax Details
      startingBasics: new FormControl('', Validators.required),

      // <!-- if "this is an existing employee" willl be selected by the user  -->
      // niCategory: new FormControl('', Validators.required),

      // if V Verterans standard rate selected in niCategory
      // firstDateofCivilianEmployment: new FormControl('', Validators.required),

      // taxCode: new FormControl('', Validators.required),
      // week1Month1: new FormControl(false, Validators.required),
      // <!-- if "this is an existing employee" willl be selected by the user  -->

      // circumstances: new FormControl('', Validators.required),
      // leavingDate: new FormControl('', Validators.required),
      // finalPayPeriod: new FormControl('', Validators.required),
      // customFinalPayPeriod: new FormControl(''),
      // provided by us not by client
      // calculate tax and pay and set in these fields
      // totalPaytoDate: new FormControl(''),
      // totalTaxtoDate: new FormControl(''),
      // provided by us not by client

      // studentLoan: new FormControl(false, Validators.required),
      // postGraduateLoan: new FormControl(false, Validators.required),
    });
  }

  getAllEmployees() {
    this.payrollService.getPayrollEmployee().subscribe(({ result }: any) => {
      this.getAllEmployeesData = result;
      // pass new Dataa from Child To parent
      this.employeeInfo.emit(this.getAllEmployeesData);
    });
  }

  submit() {
    const payload = {
      foreName: this.formControls?.foreName,
      surName: this.formControls?.surName,
      niNumber: this.formControls?.niNumber,
      dob: this.formControls?.dob,
      gender: this.formControls?.gender?.name,
      address1: this.formControls?.address1,
      address2: this.formControls?.address2,
      country: this.formControls?.country?.name,
      city: this.formControls?.city,
      postCode: this.formControls?.postCode,
      telephone: this.formControls?.telephone,
      payCycle: this.formControls?.payCycle?.name,
      contractedWeeklyHours: this.formControls?.contractedWeeklyHours?.name,
      worksNumber: this.formControls?.worksNumber,
      rtiPayId: this.formControls?.rtiPayId,
      startDate: this.formControls?.startDate,
      endDate: this.formControls?.endDate,
      bankAccountNumber: this.formControls?.bankAccountNumber,
      bankAc: this.formControls?.bankAc,
      sortCode: this.formControls?.sortCode,
      autoIncrement: this.formControls?.autoIncrement,
      deemedEmployee: this.formControls?.deemedEmployee,
      isDirector: this.formControls?.isDirector,
      directorShipStarted: this.formControls?.prefferedCalcMethod?.name,
      prefferedCalcMethod: this.formControls?.prefferedCalcMethod?.name,
      enterSpecificDate: this.formControls?.enterSpecificDate,
      receivedBy: this.formControls?.receivedBy,
      email: this.formControls?.email,
      emailPassword: this.formControls?.emailPassword,
      firstDateofCivilianEmployment:
        this.formControls?.firstDateofCivilianEmployment,
      taxCode: this.formControls?.taxCode,
      week1Month1: this.formControls?.week1Month1,
      circumstances: this.formControls?.circumstances?.name,
      leavingDate: this.formControls?.leavingDate,
      finalPayPeriod: this.formControls?.finalPayPeriod?.name,
      customFinalPayPeriod: this.formControls?.customFinalPayPeriod,
      totalPaytoDate: this.formControls?.totalPaytoDate,
      totalTaxtoDate: this.formControls?.totalTaxtoDate,
      studentLoan: this.formControls?.studentLoan,
      postGraduateLoan: this.formControls?.postGraduateLoan,
      paymentMethod: this.formControls?.paymentMethod?.name,
      startingBasics: this.formControls?.startingBasics?.name,
      niCategory: this.formControls?.niCategory?.name,
    };
    console.log(payload);
    this.payrollService
      .addPayrollEmployee(payload)
      .subscribe(({ message, data }: any) => {
        this.toasterService[data ? 'success' : 'error'](message);
        if (data) {
          this.createEmployeeForm.reset();
          this.getAllEmployees();
        }
      });
  }

  // getAllEmployees() {
  //   this.payrollService.getPayrollEmployee().subscribe(({ result }: any) => {
  //     result;
  //   });
  // }

  get formControls() {
    return this.createEmployeeForm.value;
  }

  get employeeFormControl() {
    return this.createEmployeeForm.controls;
  }

  private addFormControl(formControlName: string, required: boolean) {
    const validator = required ? Validators.required : null;

    if (formControlName === 'week1Month1') {
      this.createEmployeeForm.addControl(
        formControlName,
        this.fb.control(false, validator)
      );
    } else {
      if (!this.createEmployeeForm.contains(formControlName)) {
        this.createEmployeeForm.addControl(
          formControlName,
          this.fb.control('', validator)
        );
      }
    }
  }

  private removeFormControl(formControlName: string) {
    if (this.createEmployeeForm.contains(formControlName)) {
      this.createEmployeeForm.removeControl(formControlName);
    }
  }

  // .................... custom validation functions ................
  // <............. Custom validator that end date should be greater than start date .............>

  dateRangeValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const startDate = this.createEmployeeForm?.controls.startDate.value;
    const endDate = this.createEmployeeForm?.controls.endDate.value;

    if (startDate && endDate && startDate > endDate) {
      return { dateRangeInvalid: true };
    }

    if (startDate && endDate && endDate < startDate) {
      return { dateRangeInvalid: true };
    }
    return null;
  };
}
