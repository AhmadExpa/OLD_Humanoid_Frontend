import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAndDocumentationComponent } from './help-and-documentation.component';

describe('HelpAndDocumentationComponent', () => {
  let component: HelpAndDocumentationComponent;
  let fixture: ComponentFixture<HelpAndDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAndDocumentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAndDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
