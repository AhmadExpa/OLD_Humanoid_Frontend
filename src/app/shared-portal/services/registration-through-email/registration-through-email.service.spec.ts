import { TestBed } from '@angular/core/testing';

import { RegistrationThroughEmailService } from './registration-through-email.service';

describe('RegistrationThroughEmailService', () => {
  let service: RegistrationThroughEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationThroughEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
