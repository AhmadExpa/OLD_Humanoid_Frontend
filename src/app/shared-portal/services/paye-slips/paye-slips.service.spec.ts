import { TestBed } from '@angular/core/testing';

import { PayeSlipsService } from './paye-slips.service';

describe('PayeSlipsService', () => {
  let service: PayeSlipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayeSlipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
