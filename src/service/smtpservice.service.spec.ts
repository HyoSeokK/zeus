import { TestBed } from '@angular/core/testing';

import { SmtpserviceService } from './smtpservice.service';

describe('SmtpserviceService', () => {
  let service: SmtpserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmtpserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
