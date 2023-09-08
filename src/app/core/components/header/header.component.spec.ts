import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthenticationService, NavigationService, UserService } from '@core/services';
import { authenticationServiceMock } from '@core/mocks/authentication.service.mock';
import { navigationServiceMock } from '@core/mocks/navigation.service.mock';
import { userServiceMock } from '@core/mocks/user.service.mock';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let _navigationService: NavigationService;
    let _userService: UserService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                { provide: UserService, useValue: userServiceMock },
                { provide: NavigationService, useValue: navigationServiceMock },
            ],
            declarations: [HeaderComponent]
        })
            .compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        _navigationService = TestBed.inject(NavigationService);
        _userService = TestBed.inject(UserService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
