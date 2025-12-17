import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiabilityTotalsComponent } from './liability-totals.component';

describe('LiabilityTotalsComponent', () => {
  let component: LiabilityTotalsComponent;
  let fixture: ComponentFixture<LiabilityTotalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiabilityTotalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiabilityTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
