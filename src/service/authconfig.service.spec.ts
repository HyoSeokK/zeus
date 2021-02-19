import { TestBed } from '@angular/core/testing';

import { AuthconfigService } from './authconfig.service';

describe('AuthconfigService', () => {
  let service: AuthconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
