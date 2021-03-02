import { TestBed } from '@angular/core/testing';

import { SubmenuserviceService } from './submenuservice.service';

describe('SubmenuserviceService', () => {
  let service: SubmenuserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmenuserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
