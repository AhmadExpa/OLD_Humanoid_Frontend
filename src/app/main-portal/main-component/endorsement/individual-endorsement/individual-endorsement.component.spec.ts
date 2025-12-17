import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualEndorsementComponent } from './individual-endorsement.component';

describe('IndividualEndorsementComponent', () => {
  let component: IndividualEndorsementComponent;
  let fixture: ComponentFixture<IndividualEndorsementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualEndorsementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualEndorsementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
