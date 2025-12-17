import { TestBed } from '@angular/core/testing';

import { PaySlipManagementService } from './pay-slip-management.service';

describe('PaySlipManagementService', () => {
  let service: PaySlipManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaySlipManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
