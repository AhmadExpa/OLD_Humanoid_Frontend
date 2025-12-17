import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByContentTypeComponent } from './by-content-type.component';

describe('ByContentTypeComponent', () => {
  let component: ByContentTypeComponent;
  let fixture: ComponentFixture<ByContentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByContentTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByContentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
