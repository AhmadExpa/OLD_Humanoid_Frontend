import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeerCostComponent } from './employeer-cost.component';

describe('EmployeerCostComponent', () => {
  let component: EmployeerCostComponent;
  let fixture: ComponentFixture<EmployeerCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeerCostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeerCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
