import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsAndExperiencesComponent } from './events-and-experiences.component';

describe('EventsAndExperiencesComponent', () => {
  let component: EventsAndExperiencesComponent;
  let fixture: ComponentFixture<EventsAndExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsAndExperiencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsAndExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
