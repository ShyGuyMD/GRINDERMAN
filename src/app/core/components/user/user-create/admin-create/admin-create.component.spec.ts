import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminCreateComponent } from './admin-create.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '@core/services';
import { activatedRouteMock } from '@core/mocks/activatedroute.mock';
import { routerMock } from '@core/mocks/router.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { userServiceMock } from '@core/mocks/user.service.mock';

describe('AdminCreateComponent', () => {
  let component: AdminCreateComponent;
  let fixture: ComponentFixture<AdminCreateComponent>;

  let _userService: UserService;
  let _router: Router;
  let _activatedRoute: ActivatedRoute;
  

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateComponent ],
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
  
    fixture = TestBed.createComponent(AdminCreateComponent);
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
