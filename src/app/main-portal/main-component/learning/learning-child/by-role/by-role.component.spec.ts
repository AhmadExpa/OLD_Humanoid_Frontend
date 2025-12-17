import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByRoleComponent } from './by-role.component';

describe('ByRoleComponent', () => {
  let component: ByRoleComponent;
  let fixture: ComponentFixture<ByRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
