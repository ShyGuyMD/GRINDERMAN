import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMenuComponent } from './user-menu.component';
import { waitFor } from '@testing-library/angular';
import { userServiceMock } from '@core/mocks/user.service.mock';
import { UserService } from '@core/services';

describe('UserMenuComponent', () => {
    let component: UserMenuComponent;
    let fixture: ComponentFixture<UserMenuComponent>;

    let _userService: UserService;

    beforeEach(waitForAsync ( () => {
        TestBed.configureTestingModule({
            declarations: [UserMenuComponent],
            providers: [
            { provide: UserService, useValue: userServiceMock }
            ]
        }).compileComponents();
    }));

    beforeEach(waitForAsync ( () => {
        fixture = TestBed.createComponent(UserMenuComponent);
        component = fixture.componentInstance;

        _userService = TestBed.inject(UserService);
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
