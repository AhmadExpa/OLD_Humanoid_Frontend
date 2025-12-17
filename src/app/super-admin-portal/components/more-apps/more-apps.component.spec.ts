import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreAppsComponent } from './more-apps.component';

describe('MoreAppsComponent', () => {
  let component: MoreAppsComponent;
  let fixture: ComponentFixture<MoreAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreAppsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
