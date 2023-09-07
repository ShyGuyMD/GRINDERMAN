import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {
  AuthenticationService,
  NavigationService,
  UserService,
} from '@core/services';
import { authenticationServiceMock } from '@core/mocks/authentication.service.mock';
import { userServiceMock } from '@core/mocks/user.service.mock';
import { navigationServiceMock } from '@core/mocks/navigation.service.mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let _authService: AuthenticationService;
  let _userService: UserService;
  let _navigationService: NavigationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceMock },
        { provide: NavigationService, useValue: navigationServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    _authService = TestBed.inject(AuthenticationService);
    _navigationService = TestBed.inject(NavigationService);
    _userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
