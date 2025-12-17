// paye-timeline.component.ts
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PayeSlipsService } from 'src/app/shared-portal/services/paye-slips/paye-slips.service';

@Component({
  selector: 'app-paye-timeline',
  templateUrl: './paye-timeline.component.html',
  styleUrls: ['./paye-timeline.component.css'],
})
export class PayeTimelineComponent implements OnInit {
  selectedPayslip: any;
  showPreview: boolean = false;
  payslips: any[] = [];

  constructor(
    private payeService: PayeSlipsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchAllPaySlips();
  }

  fetchAllPaySlips(): void {
    this.payeService.fetchAllPaySlips().subscribe({
      next: (response: any) => {
        if (response.data) {
          this.payslips = response.result;
          // Sort by payDate descending
          this.payslips.sort(
            (a, b) =>
              new Date(b.payDate).getTime() - new Date(a.payDate).getTime()
          );
        }
      },
      error: (err) => {
        this.toastr.error('Failed to load payslips', 'Error');
        console.error('Fetch error:', err);
      },
    });
  }

  deletePaySlip(id: string): void {
    if (confirm('Are you sure you want to delete this payslip?')) {
      this.payeService.deletePaySlipById(id).subscribe({
        next: () => {
          this.toastr.success('Payslip deleted successfully');
          this.fetchAllPaySlips();
        },
        error: (err) => {
          this.toastr.error('Failed to delete payslip', 'Error');
          console.error('Delete error:', err);
        },
      });
    }
  }

  showPayslipPreview(id: string): void {
    // console.log('Show Pay Slip Preview');
    this.showPreview = true;
    this.payeService.fetchPaySlipById(id).subscribe({
      next: (response: any) => {
        if (response.data) {
          // console.log('Payslip Details:', response.result);
          this.selectedPayslip = response.result;
          // this.toastr.info('Payslip details logged to console');
        }
      },
      error: (err) => {
        this.toastr.error('Failed to fetch payslip details', 'Error');
        console.error('Fetch by ID error:', err);
      },
    });
  }
}
