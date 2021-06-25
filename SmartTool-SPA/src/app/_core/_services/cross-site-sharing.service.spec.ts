import { TestBed } from '@angular/core/testing';

import { CrossSiteSharingService } from './cross-site-sharing.service';

describe('CrossSiteSharingService', () => {
  let service: CrossSiteSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossSiteSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
