import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreHumanoidBrandComponent } from './more-humanoid-brand.component';

describe('MoreHumanoidBrandComponent', () => {
  let component: MoreHumanoidBrandComponent;
  let fixture: ComponentFixture<MoreHumanoidBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreHumanoidBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreHumanoidBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
