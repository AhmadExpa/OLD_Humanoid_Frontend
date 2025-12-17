import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeLinesComponent } from './pipe-lines.component';

describe('PipeLinesComponent', () => {
  let component: PipeLinesComponent;
  let fixture: ComponentFixture<PipeLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipeLinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipeLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
