import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayRunsComponent } from './pay-runs.component';

describe('PayRunsComponent', () => {
  let component: PayRunsComponent;
  let fixture: ComponentFixture<PayRunsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayRunsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayRunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
