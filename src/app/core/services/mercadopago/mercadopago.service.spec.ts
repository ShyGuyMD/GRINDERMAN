import { TestBed } from '@angular/core/testing';

import { MercadopagoService } from './mercadopago.service';
import { apiServiceMock } from '@core/mocks/api.service.mock';
import { ApiService } from '../api';

describe('MercadopagoService', () => {
  let service: MercadopagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
     providers: [
       { provide: ApiService, useValue: apiServiceMock },
     ],
   });
   service = TestBed.inject(MercadopagoService);
 });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
