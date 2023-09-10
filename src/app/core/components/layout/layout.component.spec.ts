import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { AuthenticationService, UserService } from '@core/services';
import { authenticationServiceMock } from '@core/mocks/authentication.service.mock';
import { userServiceMock } from '@core/mocks/user.service.mock';

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;
    let _userService: UserService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [{ provide: UserService, useValue: userServiceMock }],
            declarations: [LayoutComponent]
        })
            .compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        _userService = TestBed.inject(UserService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
