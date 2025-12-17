import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdMeetingsComponent } from './bd-meetings.component';

describe('BdMeetingsComponent', () => {
  let component: BdMeetingsComponent;
  let fixture: ComponentFixture<BdMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BdMeetingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BdMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
