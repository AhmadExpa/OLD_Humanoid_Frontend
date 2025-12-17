import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawLeadComponent } from './raw-lead.component';

describe('RawLeadComponent', () => {
  let component: RawLeadComponent;
  let fixture: ComponentFixture<RawLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawLeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
