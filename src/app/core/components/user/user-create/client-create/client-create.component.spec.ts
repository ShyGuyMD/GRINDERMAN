import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClientCreateComponent } from './client-create.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { activatedRouteMock } from '@core/mocks/activatedroute.mock';
import { routerMock } from '@core/mocks/router.mock';
import { userServiceMock } from '@core/mocks/user.service.mock';
import { UserService } from '@core/services';
import { AdminCreateComponent } from '../admin-create';

describe('ClientCreateComponent', () => {
  let component: ClientCreateComponent;
  let fixture: ComponentFixture<ClientCreateComponent>;

  let _userService: UserService;
  let _router: Router;
  let _activatedRoute: ActivatedRoute;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ ClientCreateComponent ],
      imports: [FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
        { provide: UserService, useValue: userServiceMock }
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
