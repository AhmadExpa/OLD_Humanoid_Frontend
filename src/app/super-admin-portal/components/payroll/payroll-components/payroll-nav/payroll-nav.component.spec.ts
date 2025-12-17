import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollNavComponent } from './payroll-nav.component';

describe('PayrollNavComponent', () => {
  let component: PayrollNavComponent;
  let fixture: ComponentFixture<PayrollNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
