import { TestBed } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import { AuthenticationService } from '@core/services';
import { authenticationServiceMock } from '@core/mocks/authentication.service.mock';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let _authService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceMock }
      ],
    });
    guard = TestBed.inject(AdminGuard);
    _authService = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
