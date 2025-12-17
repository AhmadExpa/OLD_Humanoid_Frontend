import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearEndComponent } from './year-end.component';

describe('YearEndComponent', () => {
  let component: YearEndComponent;
  let fixture: ComponentFixture<YearEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearEndComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
