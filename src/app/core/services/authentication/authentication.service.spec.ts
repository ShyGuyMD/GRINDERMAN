import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { WooCommerceApiService } from '../woo-commerce';
import { wooCommerceApiServiceMock } from '@core/mocks/woocommerceapi.service.mock';

describe('AuthenticationService', () => {
    let service: AuthenticationService;
    let _wooCommerceApiService: WooCommerceApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
              { provide: WooCommerceApiService, useValue: wooCommerceApiServiceMock },
            ],
          });
        service = TestBed.inject(AuthenticationService);
        _wooCommerceApiService = TestBed.inject(WooCommerceApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
