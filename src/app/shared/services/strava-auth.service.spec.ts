import { TestBed } from '@angular/core/testing';

import { StravaAuthService } from './strava-auth.service';

describe('StravaAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StravaAuthService = TestBed.get(StravaAuthService);
    expect(service).toBeTruthy();
  });
});
