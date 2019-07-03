import { TestBed } from '@angular/core/testing';

import { LocationInfoService } from './location-info.service';

describe('LocationInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationInfoService = TestBed.get(LocationInfoService);
    expect(service).toBeTruthy();
  });
});
