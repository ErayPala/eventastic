import { TestBed } from '@angular/core/testing';

import { AuthenticateGuardService } from './authenticate.guard.service';

describe('AuthenticateGuardService', () => {
  let service: AuthenticateGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticateGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
