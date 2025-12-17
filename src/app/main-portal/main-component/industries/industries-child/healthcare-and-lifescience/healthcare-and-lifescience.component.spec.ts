import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareAndLifescienceComponent } from './healthcare-and-lifescience.component';

describe('HealthcareAndLifescienceComponent', () => {
  let component: HealthcareAndLifescienceComponent;
  let fixture: ComponentFixture<HealthcareAndLifescienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthcareAndLifescienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthcareAndLifescienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
