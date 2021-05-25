/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KaizenService } from './kaizen.service';

describe('Service: Kaizen', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KaizenService]
    });
  });

  it('should ...', inject([KaizenService], (service: KaizenService) => {
    expect(service).toBeTruthy();
  }));
});
