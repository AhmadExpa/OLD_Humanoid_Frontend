import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCenterComponent } from './success-center.component';

describe('SuccessCenterComponent', () => {
  let component: SuccessCenterComponent;
  let fixture: ComponentFixture<SuccessCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
