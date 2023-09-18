import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientCreateComponent } from './client-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { activatedRouteMock } from '@core/mocks/activatedroute.mock';
import { routerMock } from '@core/mocks/router.mock';
import { userServiceMock } from '@core/mocks/user.service.mock';
import { NavigationService, UserService } from '@core/services';
import { navigationServiceMock } from '@core/mocks/navigation.service.mock';
import { MessageService } from 'primeng/api';

describe('ClientCreateComponent', () => {
  let component: ClientCreateComponent;
  let fixture: ComponentFixture<ClientCreateComponent>;

  let _userService: UserService;
  let _router: Router;
  let _activatedRoute: ActivatedRoute;
  let _navigationService: NavigationService;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ ClientCreateComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: NavigationService, useValue: navigationServiceMock },
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
  
    fixture = TestBed.createComponent(ClientCreateComponent);
    component = fixture.componentInstance;

    _activatedRoute = TestBed.inject(ActivatedRoute);
    _router = TestBed.inject(Router);
    _userService = TestBed.inject(UserService);
    _navigationService = TestBed.inject(NavigationService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
