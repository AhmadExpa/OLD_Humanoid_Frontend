import { TestBed } from '@angular/core/testing';

import { UmbrellaCompanyManagementService } from './umbrella-company-management.service';

describe('UmbrellaCompanyManagementService', () => {
  let service: UmbrellaCompanyManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UmbrellaCompanyManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
