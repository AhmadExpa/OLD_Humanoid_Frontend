import { TestBed } from '@angular/core/testing';

import { RawLeadService } from './raw-lead.service';

describe('RawLeadService', () => {
  let service: RawLeadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RawLeadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
