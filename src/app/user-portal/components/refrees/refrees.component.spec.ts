import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreesComponent } from './refrees.component';

describe('RefreesComponent', () => {
  let component: RefreesComponent;
  let fixture: ComponentFixture<RefreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefreesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
