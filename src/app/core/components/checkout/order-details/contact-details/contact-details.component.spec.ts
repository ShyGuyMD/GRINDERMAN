import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContactDetailsComponent } from './contact-details.component';
import { userServiceMock } from '@core/mocks/user.service.mock';
import { UserService } from '@core/services';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;
  let _userService: UserService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContactDetailsComponent],
      imports:  [FormsModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;

    _userService = TestBed.inject(UserService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
