import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminCreateComponent } from './admin-create.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '@core/services';
import { activatedRouteMock } from '@core/mocks/activatedroute.mock';
import { routerMock } from '@core/mocks/router.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { userServiceMock } from '@core/mocks/user.service.mock';
import { MessageService } from 'primeng/api';

describe('AdminCreateComponent', () => {
  let component: AdminCreateComponent;
  let fixture: ComponentFixture<AdminCreateComponent>;

  let _userService: UserService;
  

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        FormBuilder,
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
  
    fixture = TestBed.createComponent(AdminCreateComponent);
    component = fixture.componentInstance;

    _userService = TestBed.inject(UserService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
