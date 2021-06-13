import { TestBed } from '@angular/core/testing';

import { InterestPointService } from './interest-point.service';

describe('InterestPointService', () => {
  let service: InterestPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
