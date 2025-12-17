import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractSendingThanksPageComponent } from './contract-sending-thanks-page.component';

describe('ContractSendingThanksPageComponent', () => {
  let component: ContractSendingThanksPageComponent;
  let fixture: ComponentFixture<ContractSendingThanksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractSendingThanksPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractSendingThanksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
