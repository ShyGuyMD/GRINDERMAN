import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { apiServiceMock } from '@core/mocks/api.service.mock';
import { WooCommerceApiService } from '../woo-commerce';
import { wooCommerceApiServiceMock } from '@core/mocks/woocommerceapi.service.mock';

describe('UserService', () => {
    let service: UserService;

    let _wooCommerceApiService: WooCommerceApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: WooCommerceApiService, useValue: wooCommerceApiServiceMock }
              ],
        });
      });

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UserService);
        _wooCommerceApiService = TestBed.inject(WooCommerceApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
