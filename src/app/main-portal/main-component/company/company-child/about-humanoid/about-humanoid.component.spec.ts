import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutHumanoidComponent } from './about-humanoid.component';

describe('AboutHumanoidComponent', () => {
  let component: AboutHumanoidComponent;
  let fixture: ComponentFixture<AboutHumanoidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutHumanoidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutHumanoidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
