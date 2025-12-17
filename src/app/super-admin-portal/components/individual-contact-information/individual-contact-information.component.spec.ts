import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualContactInformationComponent } from './individual-contact-information.component';

describe('IndividualContactInformationComponent', () => {
  let component: IndividualContactInformationComponent;
  let fixture: ComponentFixture<IndividualContactInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualContactInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualContactInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
