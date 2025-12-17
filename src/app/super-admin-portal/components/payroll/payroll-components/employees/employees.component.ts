import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { PayrollService } from 'src/app/shared-portal/services/payroll-management/payroll.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  public cols: any = [];
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

  startingBasics = [
    { name: 'This is an existing employee' },
    { name: 'Employee Declaration:P45-Select category Below' },
    { name: 'Employee Declaration:P46-Select category Below' },
  ];

  circumstances = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];

  paymentMethods = [
    { name: 'cash' },
    { name: 'cheque' },
    { name: 'Bank Transfer' },
  ];

  countries = [{ name: 'Pakistan' }, { name: 'India' }, { name: 'Iran' }];

  public getAllEmployeesData: any = [];
  public getIndividualEmployeeData: any = [];
  public employeeDialog: boolean = false;
  public selectedColumns: any = [];

  // -------- For-update-Employee-Properties ----- //
  public UpDatePayrollEmployeeForm: FormGroup | any;
  public makeMyIdPublic: any;

  public activeSoftDeleteModal: Boolean = false;
  public activeHardDeleteModal: Boolean = false;
  public employeeId: any;

  constructor(
    private readonly payrollService: PayrollService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService
  ) {
    this.updatePayrollEmpoyeeForm();
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'foreName', header: 'Fore Name' },
      { field: 'surName', header: 'Sure Name' },
      { field: 'payCycle', header: 'Pay Cycle' },
      { field: 'receivedBy', header: 'Pay Document Preferences' },
      { field: 'paySLipMessage', header: 'Pay Slip Message' },
      { field: 'paymentMethod', header: 'Payment Method' },
    ];

    this.getAllEmployees();

    // ---- filtered-column ----- //
    this.selectedColumns = this.cols;
    // ---- filtered-column ----- //
  }

  // ---- filtered-column ----- //
  @Input() get _selectedColumns(): any[] {
    return this.selectedColumns;
  }

  set _selectedColumns(val: any[]) {
    this.selectedColumns = this.cols.filter((col: any) => val.includes(col));
  }
  // ---- filtered-column ----- //

  // ------------- Update Employee Form -------------- //
  updatePayrollEmpoyeeForm() {
    this.UpDatePayrollEmployeeForm = this.formBuilder.group({
      // PersonalDetails
      foreName: new FormControl('', Validators.required),
      surName: new FormControl(''),
      niNumber: new FormControl(''),
      dob: new FormControl('',Validators.required),
      gender:new FormControl('',Validators.required),
      // Contact details
      address1: new FormControl(''),
      address2: new FormControl(''),
      city: new FormControl(''),
      postCode: new FormControl(''),
      country: new FormControl(''),
      telephone: new FormControl(''),
      // employment details
      payCycle: new FormControl(''),
      contractedWeeklyHours: new FormControl(''),
      worksNumber: new FormControl(''),
      rtiPayId: new FormControl(''),
      startDate: new FormControl('',[this.dateRangeValidator,Validators.required]),
      endDate: new FormControl('',this.dateRangeValidator),
      paymentMethod: new FormControl(''),

      //controls when Bank transfer method will be selected by the client
      bankAccountNumber: new FormControl(''),
      bankAc: new FormControl(''),
      sortCode: new FormControl(''),

      autoIncrement: new FormControl(false),
      deemedEmployee: new FormControl(false),

      isDirector: new FormControl(false),
      directorShipStarted: new FormControl(''),
      prefferedCalcMethod: new FormControl(''),
      enterSpecificDate: new FormControl(''),

      receivedBy: new FormControl(''),
      // if received by email
      emailPassword: new FormControl(''),
      // if received by email

      email: new FormControl(''),
      // previous Tax Details
      startingBasics: new FormControl(''),

      // <!-- if "this is an existing employee" willl be selected by the user  -->
      niCategory: new FormControl(''),

      // if V Verterans standard rate selected in niCategory
      firstDateofCivilianEmployment: new FormControl(''),

      taxCode: new FormControl(''),
      week1Month1: new FormControl(false),
      // <!-- if "this is an existing employee" willl be selected by the user  -->

      circumstances: new FormControl(''),
      leavingDate: new FormControl(''),
      finalPayPeriod: new FormControl(''),
      customFinalPayPeriod: new FormControl(''),
      totalPaytoDate: new FormControl(''),
      totalTaxtoDate: new FormControl(''),
      studentLoan: new FormControl(false),
      postGraduateLoan: new FormControl(false),
    });
  }

  activeModal(data: { _id: any; modal?: 'hard' | 'soft' }) {
    this.employeeId = data._id;

    this.activeSoftDeleteModal = data.modal === 'soft';
    this.activeHardDeleteModal = data.modal === 'hard';
  }

  // ------------- Update Employee Form -------------- //
  getAllEmployees() {
    this.payrollService.getPayrollEmployee().subscribe(({ result }: any) => {
      this.getAllEmployeesData = result.filter(
        (employee: any) => employee.status !== 1
      );
      // console.log(this.getAllEmployeesData);
    });
  }

  getEmployeeById(Id: string) {
    this.makeMyIdPublic = Id;
    this.updatePayrollEmpoyeeForm();
    // console.log(this.UpDatePayrollEmployeeForm);
    this.payrollService
      .getPayrollEmployeeIdData(Id)
      .subscribe(({ result }: any) => {
        this.getIndividualEmployeeData = result;

        this.UpDatePayrollEmployeeForm.patchValue({
          address1: this.getIndividualEmployeeData?.address1,
          address2: this.getIndividualEmployeeData?.address2,
          autoIncrement: this.getIndividualEmployeeData?.autoIncrement,
          bankAc: this.getIndividualEmployeeData?.bankAc,
          bankAccountNumber: this.getIndividualEmployeeData?.bankAccountNumber,
          circumstances: this.getIndividualEmployeeData?.circumstances,
          city: this.getIndividualEmployeeData?.city,
          country: { name: this.getIndividualEmployeeData?.country },
          contractedWeeklyHours: {
            name: this.getIndividualEmployeeData?.contractedWeeklyHours,
          },
          customFinalPayPeriod:
            this.getIndividualEmployeeData?.customFinalPayPeriod,

          // createdAt: this.payrollService.convertToDate(
          //   this.getIndividualEmployeeData?.createdAt
          // ),
          dob: this.payrollService.convertToDate(
            this.getIndividualEmployeeData?.dob
          ),
          gender: {
            name: this.getIndividualEmployeeData?.gender,
          },
          deemedEmployee: this.getIndividualEmployeeData?.deemedEmployee,
          directorShipStarted: {
            name: this.getIndividualEmployeeData?.directorShipStarted,
          },

          email: this.getIndividualEmployeeData?.email,
          emailPassword: this.getIndividualEmployeeData?.emailPassword,
          endDate: this.payrollService.convertToDate(
            this.getIndividualEmployeeData?.endDate
          ),
          enterSpecificDate: this.payrollService.convertToDate(
            this.getIndividualEmployeeData?.enterSpecificDate
          ),
          foreName: this.getIndividualEmployeeData?.foreName,
          niCategory: { name: this.getIndividualEmployeeData?.niCategory },
          isDirector: this.getIndividualEmployeeData?.isDirector,
          leavingDate: this.payrollService.convertToDate(
            this.getIndividualEmployeeData?.leavingDate
          ),
          finalPayPeriod: {
            name: this.getIndividualEmployeeData?.finalPayPeriod,
          },
          firstDateofCivilianEmployment: this.payrollService.convertToDate(
            this.getIndividualEmployeeData?.firstDateofCivilianEmployment
          ),
          niNumber: this.getIndividualEmployeeData?.niNumber,
          paymentMethod: {
            name: this.getIndividualEmployeeData?.paymentMethod,
          },

          payCycle: { name: this.getIndividualEmployeeData?.payCycle },
          prefferedCalcMethod: {
            name: this.getIndividualEmployeeData?.prefferedCalcMethod,
          },

          postCode: this.getIndividualEmployeeData?.postCode,
          postGraduateLoan: this.getIndividualEmployeeData?.postGraduateLoan,
          receivedBy: this.getIndividualEmployeeData?.receivedBy,
          rtiPayId: this.getIndividualEmployeeData?.rtiPayId,
          sortCode: this.getIndividualEmployeeData?.sortCode,
          taxCode: this.getIndividualEmployeeData?.taxCode,

          startDate: this.payrollService.convertToDate(
            this.getIndividualEmployeeData?.startDate
          ),
          startingBasics: {
            name: this.getIndividualEmployeeData?.startingBasics,
          },
          studentLoan: this.getIndividualEmployeeData?.studentLoan,
          surName: this.getIndividualEmployeeData?.surName,
          telephone: this.getIndividualEmployeeData?.telephone,
          totalPaytoDate: this.getIndividualEmployeeData?.totalPaytoDate,
          totalTaxtoDate: this.getIndividualEmployeeData?.totalTaxtoDate,
          week1Month1: this.getIndividualEmployeeData?.week1Month1,
          worksNumber: this.getIndividualEmployeeData?.worksNumber,
        });
        // console.log(this.UpDatePayrollEmployeeForm);
      });
  }

  updateEmployee() {
    let payLoad = this.UpDatePayrollEmployeeForm.value;
    payLoad['_id'] = this.makeMyIdPublic; // Adding id into payload to update unique data
    payLoad['contractedWeeklyHours']=this.UpDatePayrollEmployeeForm?.value?.contractedWeeklyHours?.name
    payLoad['country']=this.UpDatePayrollEmployeeForm?.value?.country?.name
    payLoad['finalPayPeriod']=this.UpDatePayrollEmployeeForm?.value?.finalPayPeriod?.name
    payLoad['niCategory']=this.UpDatePayrollEmployeeForm?.value?.niCategory?.name
    payLoad['payCycle']=this.UpDatePayrollEmployeeForm?.value?.payCycle?.name
    payLoad['paymentMethod']=this.UpDatePayrollEmployeeForm?.value?.paymentMethod?.name
    payLoad['prefferedCalcMethod']=this.UpDatePayrollEmployeeForm?.value?.prefferedCalcMethod?.name
    payLoad['startingBasics']=this.UpDatePayrollEmployeeForm?.value?.startingBasics?.name
    payLoad['directorShipStarted']=this.UpDatePayrollEmployeeForm?.value?.directorShipStarted?.name
    payLoad['gender']=this.UpDatePayrollEmployeeForm?.value?.gender?.name

   





    // console.log(payLoad)
    this.payrollService
      .updatePayrollEmployeeData(payLoad)
      .subscribe(({ data, message }: any) => {
        this.toasterService[data ? 'success' : 'error'](message);
        this.getAllEmployees();
        // this.getEmployeeById(this.makeMyIdPublic); // Calling the getEmployeeById function to show the new Data
      });
  }

  softDeleteEmployee(Id: string) {
    this.payrollService
      .softDeletePayrollEmployeeIdData(Id)
      .subscribe(({ data, message }: any) => {
        this.toasterService[data ? 'success' : 'error'](message);
        this.getAllEmployees();
      });
  }

  deleteEmployee(Id: string) {
    this.payrollService
      .deletePayrollEmployeeIdData(Id)
      .subscribe(({ data, message }: any) => {
        this.toasterService[data ? 'success' : 'error'](message);
        this.getAllEmployees();
      });
  }

  // ------------- Employee-Modal -------------- //
  openNew() {
    this.employeeDialog = true;
  }

  // ------------- Clear-Filter-Data -------------- //
  clear(table: Table) {
    table.clear();
  }

  get formControls() {
    return this.UpDatePayrollEmployeeForm?.value;
  }

  get employeeFormControl() {
    return this.UpDatePayrollEmployeeForm?.controls;
  }

  // -------- For state mangement After Adding new employee ---------------//

  public gettingNewEmpoyeesFromChild(newEmployees: Event) {
    this.getAllEmployeesData = newEmployees;
    this.employeeDialog = false;
    // console.log(newEmployees);
  }

  // -------  For state mangement After Adding new employee ---------------//




   // .................... custom validation functions ................
  // <............. Custom validator that end date should be greater than start date .............>

  dateRangeValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const startDate = this.UpDatePayrollEmployeeForm?.controls.startDate.value;
    const endDate = this.UpDatePayrollEmployeeForm?.controls.endDate.value;

    if (startDate && endDate && startDate > endDate) {
      return { dateRangeInvalid: true };
    }

    if (startDate && endDate && endDate < startDate) {
      return { dateRangeInvalid: true };
    }
    return null;
  };
}
