import { TestBed } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { routerMock } from '@core/mocks/router.mock';
import { Router } from '@angular/router';
import { userServiceMock } from '@core/mocks/user.service.mock';
import { UserService } from '../user';

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
     providers: [
       NavigationService,
       { provide: UserService, useValue: userServiceMock },
       { provide: Router, useValue: routerMock },
     ],
   });
   service = TestBed.inject(NavigationService);
 });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
