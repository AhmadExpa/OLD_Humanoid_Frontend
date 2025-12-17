import { TestBed } from '@angular/core/testing';

import { SignatureServicesService } from './signature-services.service';

describe('SignatureServicesService', () => {
  let service: SignatureServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignatureServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
