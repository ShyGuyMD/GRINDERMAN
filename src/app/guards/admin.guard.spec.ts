import { TestBed } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import { UserService } from '@core/services';
import { routerMock } from '@core/mocks/router.mock';
import { Router } from '@angular/router';
import { userServiceMock } from '@core/mocks/user.service.mock';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let _userService: UserService;
  let _router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: UserService, useValue: userServiceMock }
      ],
    });
    guard = TestBed.inject(AdminGuard);
    _userService = TestBed.inject(UserService);
    _router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
