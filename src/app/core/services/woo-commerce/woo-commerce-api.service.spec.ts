import { TestBed } from '@angular/core/testing';

import { WooCommerceApiService } from './woo-commerce-api.service';
import { ApiService } from '../api';
import { ProductService } from '../product';
import { apiServiceMock } from '@core/mocks/api.service.mock';
import { productServiceMock } from '@core/mocks/product.service.mock';

describe('WooCommerceApiService', () => {
    let service: WooCommerceApiService;
    let _apiService: ApiService;
    let _productService: ProductService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ApiService, useValue: apiServiceMock },
                { provide: ProductService, useValue: productServiceMock },
              ],
        });
      });
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(WooCommerceApiService);
        _apiService = TestBed.inject(ApiService);
        _productService = TestBed.inject(ProductService);
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
