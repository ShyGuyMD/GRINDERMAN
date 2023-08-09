import { TestBed } from '@angular/core/testing';

import { CoCartApiService } from './co-cart-api.service';

describe('CoCartApiService', () => {
  let service: CoCartApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoCartApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
