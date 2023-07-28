import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '@core/services';
import { authenticationServiceMock } from '@core/mocks/authentication.service.mock';
import { Router } from '@angular/router';
import { routerMock } from '@core/mocks/router.mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let _authService: AuthenticationService;
  let _router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    })
    .compileComponents();


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    _authService = TestBed.inject(AuthenticationService);
    _router = TestBed.inject(Router);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
