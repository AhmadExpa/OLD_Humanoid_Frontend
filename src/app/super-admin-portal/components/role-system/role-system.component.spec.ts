import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSystemComponent } from './role-system.component';

describe('RoleSystemComponent', () => {
  let component: RoleSystemComponent;
  let fixture: ComponentFixture<RoleSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
