import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNetPayComponent } from './employee-net-pay.component';

describe('EmployeeNetPayComponent', () => {
  let component: EmployeeNetPayComponent;
  let fixture: ComponentFixture<EmployeeNetPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeNetPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeNetPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
