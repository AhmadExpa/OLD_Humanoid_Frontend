import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingDropdownComponent } from './reporting-dropdown.component';

describe('ReportingDropdownComponent', () => {
  let component: ReportingDropdownComponent;
  let fixture: ComponentFixture<ReportingDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportingDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportingDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
