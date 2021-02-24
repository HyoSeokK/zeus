import { TestBed } from '@angular/core/testing';

import { SmtpService } from './smtpservice.service';

describe('SmtpserviceService', () => {
  let service: SmtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
