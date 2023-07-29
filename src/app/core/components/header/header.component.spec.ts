import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthenticationService } from '@core/services';
import { authenticationServiceMock } from '@core/mocks/authentication.service.mock';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let _authService: AuthenticationService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                { provide: AuthenticationService, useValue: authenticationServiceMock }],
            declarations: [HeaderComponent]
        })
            .compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        _authService = TestBed.inject(AuthenticationService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
