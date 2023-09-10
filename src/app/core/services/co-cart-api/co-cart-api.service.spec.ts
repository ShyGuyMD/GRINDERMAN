import { TestBed } from '@angular/core/testing';

import { CoCartApiService } from './co-cart-api.service';
import { apiServiceMock } from '@core/mocks/api.service.mock';
import { ApiService } from '../api';

describe('CoCartApiService', () => {
  let service: CoCartApiService;

  beforeEach(() => {
     TestBed.configureTestingModule({
      providers: [
        CoCartApiService,
        { provide: ApiService, useValue: apiServiceMock },
      ],
    });
    service = TestBed.inject(CoCartApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
