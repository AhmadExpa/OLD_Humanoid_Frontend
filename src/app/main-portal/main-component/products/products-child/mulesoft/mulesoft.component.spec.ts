import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MulesoftComponent } from './mulesoft.component';

describe('MulesoftComponent', () => {
  let component: MulesoftComponent;
  let fixture: ComponentFixture<MulesoftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MulesoftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MulesoftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
