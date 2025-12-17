import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerGoodsComponent } from './consumer-goods.component';

describe('ConsumerGoodsComponent', () => {
  let component: ConsumerGoodsComponent;
  let fixture: ComponentFixture<ConsumerGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerGoodsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
