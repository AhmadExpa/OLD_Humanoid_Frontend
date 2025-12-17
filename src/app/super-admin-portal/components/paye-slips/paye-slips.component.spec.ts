import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeSlipsComponent } from './paye-slips.component';

describe('PayeSlipsComponent', () => {
  let component: PayeSlipsComponent;
  let fixture: ComponentFixture<PayeSlipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeSlipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayeSlipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
