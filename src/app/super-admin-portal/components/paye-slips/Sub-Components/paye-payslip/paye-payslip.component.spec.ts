import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayePayslipComponent } from './paye-payslip.component';

describe('PayePayslipComponent', () => {
  let component: PayePayslipComponent;
  let fixture: ComponentFixture<PayePayslipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayePayslipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayePayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
