import { TestBed } from '@angular/core/testing';

import { RoverControlProxyService } from './rover-control-proxy.service';

describe('RoverControlProxyService', () => {
  let service: RoverControlProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoverControlProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
