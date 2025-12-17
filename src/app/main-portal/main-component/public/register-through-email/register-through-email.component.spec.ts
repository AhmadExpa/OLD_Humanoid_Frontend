import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterThroughEmailComponent } from './register-through-email.component';

describe('RegisterThroughEmailComponent', () => {
  let component: RegisterThroughEmailComponent;
  let fixture: ComponentFixture<RegisterThroughEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterThroughEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterThroughEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
