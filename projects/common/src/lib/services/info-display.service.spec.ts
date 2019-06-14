import { TestBed } from '@angular/core/testing';

import { InfoDisplayService } from './info-display.service';

describe('InfoDisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfoDisplayService = TestBed.get(InfoDisplayService);
    expect(service).toBeTruthy();
  });
});
