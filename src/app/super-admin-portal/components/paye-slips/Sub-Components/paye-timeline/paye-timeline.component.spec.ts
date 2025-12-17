import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeTimelineComponent } from './paye-timeline.component';

describe('PayeTimelineComponent', () => {
  let component: PayeTimelineComponent;
  let fixture: ComponentFixture<PayeTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayeTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
