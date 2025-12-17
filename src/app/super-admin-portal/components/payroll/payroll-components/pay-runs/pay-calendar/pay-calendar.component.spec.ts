import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCalendarComponent } from './pay-calendar.component';

describe('PayCalendarComponent', () => {
  let component: PayCalendarComponent;
  let fixture: ComponentFixture<PayCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
