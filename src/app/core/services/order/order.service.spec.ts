import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { WooCommerceApiService } from '../woo-commerce';
import { UtilsService } from '../utils';
import { CartService } from '../cart';
import { MercadopagoService } from '../mercadopago/mercadopago.service';
import { wooCommerceApiServiceMock } from '@core/mocks/woocommerceapi.service.mock';
import { mercadopagoServiceMock } from '@core/mocks/mercadopago.service.mock';
import { cartServiceMock } from '@core/mocks/cart.service.mock';
import { utilServiceMock } from '@core/mocks/utilService.mock';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
     providers: [
       OrderService,
       { provide: WooCommerceApiService, useValue: wooCommerceApiServiceMock },
       { provide: MercadopagoService, useValue: mercadopagoServiceMock },
       { provide: UtilsService, useValue: utilServiceMock },
       { provide: CartService, useValue: cartServiceMock },
     ],
   });
   service = TestBed.inject(OrderService);
 });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
