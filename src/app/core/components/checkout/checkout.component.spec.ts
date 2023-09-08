import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { UserService } from '@core/services';
import { routerMock } from '@core/mocks/router.mock';
import { userServiceMock } from '@core/mocks/user.service.mock';
import { Router } from '@angular/router';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let _router: Router;
  let _userService: UserService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;

    _userService = TestBed.inject(UserService);
    _router= TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
