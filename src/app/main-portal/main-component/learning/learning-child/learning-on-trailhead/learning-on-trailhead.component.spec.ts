import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningOnTrailheadComponent } from './learning-on-trailhead.component';

describe('LearningOnTrailheadComponent', () => {
  let component: LearningOnTrailheadComponent;
  let fixture: ComponentFixture<LearningOnTrailheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningOnTrailheadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningOnTrailheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
