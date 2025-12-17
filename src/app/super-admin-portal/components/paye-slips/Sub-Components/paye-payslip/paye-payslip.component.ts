import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ClientManagementService } from 'src/app/shared-portal/services/client-management.service';
import { PayeSlipsService } from 'src/app/shared-portal/services/paye-slips/paye-slips.service';
import { UmbrellaCompanyManagementService } from 'src/app/shared-portal/services/umbrella-company-management.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-paye-payslip',
  templateUrl: './paye-payslip.component.html',
  styleUrls: ['./paye-payslip.component.css'],
})
export class PayePayslipComponent implements OnInit {
  showPreview: boolean = false;
  currentDate: Date = new Date();
  payeForm: FormGroup | any;
  companies: any[] = [];
  clients: any[] = [];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientManagementService,
    private companyService: UmbrellaCompanyManagementService,
    private payeSlipsService: PayeSlipsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCompanies();
    this.loadClients();
  }

  initForm(): void {
    this.payeForm = this.fb.group({
      companyName: [null, Validators.required],
      companyEmail: [null, Validators.required],
      clientName: [null, Validators.required],
      clientEmail: [null, Validators.required],

      unitRates: this.fb.array([]),
      companyIncomeAndCosts: [{ value: 0, disabled: true }],
      companyMargin: ['0'],
      employeeNI: ['0'],

      agency: [''],
      agencyDescription: [''],

      employeeName: [{ value: '', disabled: true }],
      employeeNumber: [''],
      niNumber: [''],
      taxCode: [''],
      payDate: [null, Validators.required],
      periods: [''],

      payments: this.fb.array([
        this.fb.group({
          description: ['Basic Rate', Validators.required],
          units: [0],
          rate: [0],
          totalAmount: [{ value: 0, disabled: true }],
        }),
        this.fb.group({
          description: ['Additional Taxable Wage', Validators.required],
          units: [0],
          rate: [0],
          totalAmount: [{ value: 0, disabled: true }],
        }),
      ]),
      paymentSum: [{ value: 0, disabled: true }],

      deductions: this.fb.array([
        this.fb.group({
          description: ['PAYE(Income tax)', Validators.required],
          amount: [0],
        }),
        this.fb.group({
          description: ["Employee's NIC", Validators.required],
          amount: [0],
        }),
      ]),
      deductionSum: [{ value: 0, disabled: true }],

      payeReference: [''],
      taxPeriod: [''],
      periodEnding: [''],
      payFrequency: [null, Validators.required],

      totalTaxablePay: [{ value: 0, disabled: true }],
      earningsForNICs: [{ value: 0, disabled: true }],
      expenses: [0],
      netPayment: [{ value: 0, disabled: true }],

      totalNlablePay: [{ value: 0, disabled: true }],
      payeIncomeTax: [{ value: 0, disabled: true }],
      nationalInsurance: [{ value: 0, disabled: true }],
      totalPayment: [{ value: 0, disabled: true }],
      clientAddress: [''],
      message: [''],
    });
  }

  loadCompanies(): void {
    this.companyService.getUmbrellaCompanyFormData().subscribe((res: any) => {
      if (res.data) {
        this.companies = res.result.map((company: any) => ({
          label: company.companyName,
          value: company,
        }));
      }
    });
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe((res: any) => {
      if (res.data) {
        this.clients = res.result.map((client: any) => ({
          label: client.name,
          value: client,
        }));
      }
    });
  }

  onClientSelect(client: any): void {
    console.log(client);
    this.payeForm.patchValue({
      clientName: client.label,
      clientEmail: client.value.email,
      employeeName: client.label,
    });
  }
  onCompanySelect(company: any): void {
    this.payeForm.patchValue({
      companyName: company.label,
      companyEmail: company.value.companyEmail,
    });
  }

  get unitRates(): FormArray {
    return this.payeForm.get('unitRates') as FormArray;
  }

  get payments(): FormArray {
    return this.payeForm.get('payments') as FormArray;
  }

  get deductions(): FormArray {
    return this.payeForm.get('deductions') as FormArray;
  }

  calculateTotals(): void {
    const unitRatesTotal = this.unitRates.controls.reduce(
      (sum, group) =>
        sum +
        (Number(group.get('units')?.value) || 0) *
          (Number(group.get('rate')?.value) || 0),
      0
    );

    this.unitRates.controls.forEach((control: AbstractControl) => {
      const group = control as FormGroup;
      const units = Number(group.get('units')?.value) || 0;
      const rate = Number(group.get('rate')?.value) || 0;
      const totalAmount = units * rate;
      group.get('totalAmount')?.patchValue(totalAmount);
    });

    this.payeForm.patchValue({ companyIncomeAndCosts: unitRatesTotal });

    const paymentsTotal = this.payments.controls.reduce(
      (sum, group) =>
        sum +
        (Number(group.get('units')?.value) || 0) *
          (Number(group.get('rate')?.value) || 0),
      0
    );

    this.payments.controls.forEach((control: AbstractControl) => {
      const group = control as FormGroup;
      const units = Number(group.get('units')?.value) || 0;
      const rate = Number(group.get('rate')?.value) || 0;
      const totalAmount = units * rate;
      group.get('totalAmount')?.patchValue(totalAmount);
    });

    this.payeForm.patchValue({
      paymentSum: paymentsTotal,
      totalTaxablePay: paymentsTotal,
      earningsForNICs: paymentsTotal,
      totalNlablePay: paymentsTotal,
    });

    const deductionsTotal = this.deductions.controls.reduce(
      (sum, group) => sum + (Number(group.get('amount')?.value) || 0),
      0
    );

    this.deductions.controls.forEach((control: AbstractControl) => {
      const group = control as FormGroup;
      const amount = Number(group.get('amount')?.value) || 0;
      group.get('amount')?.patchValue(amount);
    });

    this.payeForm.patchValue({ deductionSum: deductionsTotal });

    // Extract PAYE(Income tax) and Employee's NIC specifically by exact matching
    const payeIncomeTax =
      this.deductions.controls
        .find(
          (group) =>
            group.get('description')?.value?.toLowerCase() ===
            'paye(income tax)'
        )
        ?.get('amount')?.value || 0;

    const nationalInsurance =
      this.deductions.controls
        .find(
          (group) =>
            group.get('description')?.value?.toLowerCase() === "employee's nic"
        )
        ?.get('amount')?.value || 0;

    this.payeForm.patchValue({ payeIncomeTax, nationalInsurance });

    const expenses = Number(this.payeForm.get('expenses')?.value) || 0;
    const netPayment = paymentsTotal - deductionsTotal - expenses;
    this.payeForm.patchValue({ netPayment, totalPayment: netPayment });
    // console.log(this.payeForm.getRawValue());
  }

  addUnitRate(): void {
    this.unitRates.push(
      this.fb.group({
        units: [0],
        rate: [0],
        totalAmount: [{ value: 0, disabled: true }],
      })
    );
  }

  addPayment(): void {
    this.payments.push(
      this.fb.group({
        description: [''],
        units: [0],
        rate: [0],
        totalAmount: [{ value: 0, disabled: true }],
      })
    );
  }

  addDeduction(): void {
    this.deductions.push(
      this.fb.group({
        description: [''],
        amount: [0],
      })
    );
  }
  showPayslipPreview(): void {
    console.log('Show Pay Slip Preview');
    this.showPreview = true;
    this.calculateTotals();
  }
  printPayslip(): void {
    window.print();
  }
  sendPayslip(): void {
    this.calculateTotals();
    const payload = this.payeForm.getRawValue();

    this.payeSlipsService.createPaySlip(payload).subscribe({
      next: (res) => {
        this.toastr.success('Pay Slip submitted successfully');
      },
      error: (err) => {
        this.toastr.error('Failed to submit Pay Slip');
        console.error(err);
      },
    });
  }
}
