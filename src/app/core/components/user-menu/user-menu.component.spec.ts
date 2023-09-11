import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMenuComponent } from './user-menu.component';
import { waitFor } from '@testing-library/angular';
import { userServiceMock } from '@core/mocks/user.service.mock';
import { AuthenticationService, NavigationService, UserService } from '@core/services';
import { authenticationServiceMock } from '@core/mocks/authentication.service.mock';
import { navigationServiceMock } from '@core/mocks/navigation.service.mock';

describe('UserMenuComponent', () => {
    let component: UserMenuComponent;
    let fixture: ComponentFixture<UserMenuComponent>;

    let _userService: UserService;
    let _authService: AuthenticationService;
    let _navigationService: NavigationService;

    beforeEach(waitForAsync ( () => {
        TestBed.configureTestingModule({
            declarations: [UserMenuComponent],
            providers: [
            { provide: UserService, useValue: userServiceMock },
            { provide: AuthenticationService, useValue: authenticationServiceMock },
            { provide: NavigationService, useValue: navigationServiceMock }
            ]
        }).compileComponents();
    }));

    beforeEach(waitForAsync ( () => {
        fixture = TestBed.createComponent(UserMenuComponent);
        component = fixture.componentInstance;

        _userService = TestBed.inject(UserService);
        _authService = TestBed.inject(AuthenticationService);
        _navigationService = TestBed.inject(NavigationService);
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
