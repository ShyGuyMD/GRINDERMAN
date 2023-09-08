import { TestBed } from '@angular/core/testing';

import { DeliveryService } from './delivery.service';
import { apiServiceMock } from '@core/mocks/api.service.mock';
import { cartServiceMock } from '@core/mocks/cart.service.mock';
import { ApiService } from '../api';
import { CartService } from '../cart';
import { CoCartApiService } from '../co-cart-api';

describe('DeliveryService', () => {
  let service: DeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
     providers: [
       CoCartApiService,
       { provide: ApiService, useValue: apiServiceMock },
       { provide: CartService, useValue: cartServiceMock },
     ],
   });
   service = TestBed.inject(DeliveryService);
 });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
