import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { LocalStorageService } from '../local-storage';
import { CoCartApiService } from '../co-cart-api';
import { coCartApiServiceMock } from '@core/mocks/coCartApi.service.mock';
import { localStorageServiceMock } from '@core/mocks/localStorage.service.mock';

describe('AuthenticationService', () => {
    let service: AuthenticationService;
    let _coCartApiService: CoCartApiService;
    let _localStorageService: LocalStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
              { provide: CoCartApiService, useValue: coCartApiServiceMock },
              { provide: LocalStorageService, useValue: localStorageServiceMock },
            ],
          });
        service = TestBed.inject(AuthenticationService);
        _coCartApiService = TestBed.inject(CoCartApiService);
        _localStorageService = TestBed.inject(LocalStorageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
