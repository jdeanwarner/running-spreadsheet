import { TestBed } from '@angular/core/testing';

import { StravaFactoryService } from './strava-factory.service';

describe('StravaFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StravaFactoryService = TestBed.get(StravaFactoryService);
    expect(service).toBeTruthy();
  });
});
