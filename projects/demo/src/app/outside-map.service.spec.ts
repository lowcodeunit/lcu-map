import { TestBed } from '@angular/core/testing';

import { OutsideMapService } from './outside-map.service';

describe('OutsideMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutsideMapService = TestBed.get(OutsideMapService);
    expect(service).toBeTruthy();
  });
});
