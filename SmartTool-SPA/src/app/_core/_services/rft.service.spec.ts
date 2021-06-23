import { TestBed } from '@angular/core/testing';

import { RftService } from './rft.service';

describe('RftService', () => {
  let service: RftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
