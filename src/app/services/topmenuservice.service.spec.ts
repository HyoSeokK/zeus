import { TestBed } from '@angular/core/testing';

import { TopmenuserviceService } from './topmenuservice.service';

describe('TopmenuserviceService', () => {
  let service: TopmenuserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopmenuserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
