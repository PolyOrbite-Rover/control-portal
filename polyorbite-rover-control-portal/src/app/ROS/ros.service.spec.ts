import { TestBed } from '@angular/core/testing';

import { ROSService } from './ros.service';

describe('ROSService', () => {
  let service: ROSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ROSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
