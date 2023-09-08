import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { WooCommerceApiService } from '../woo-commerce';
import { wooCommerceApiServiceMock } from '@core/mocks/woocommerceapi.service.mock';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
     providers: [
       OrderService,
       { provide: WooCommerceApiService, useValue: wooCommerceApiServiceMock },
     ],
   });
   service = TestBed.inject(OrderService);
 });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
