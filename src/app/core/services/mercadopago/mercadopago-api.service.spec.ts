import { TestBed } from '@angular/core/testing';

import { MercadopagoApiService } from './mercadopago-api.service';
import { apiServiceMock } from '@core/mocks/api.service.mock';
import { ApiService } from '../api';

describe('MercadopagoApiService', () => {
  let service: MercadopagoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
     providers: [
       { provide: ApiService, useValue: apiServiceMock },
     ],
   });
   service = TestBed.inject(MercadopagoApiService);
 });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
