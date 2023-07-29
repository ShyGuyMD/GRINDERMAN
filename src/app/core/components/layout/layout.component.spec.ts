import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { AuthenticationService } from '@core/services';
import { authenticationServiceMock } from '@core/mocks/authentication.service.mock';

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;
    let _authService: AuthenticationService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [{ provide: AuthenticationService, useValue: authenticationServiceMock }],
            declarations: [LayoutComponent]
        })
            .compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        _authService = TestBed.inject(AuthenticationService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
