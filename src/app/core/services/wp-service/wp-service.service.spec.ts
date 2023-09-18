import { TestBed } from '@angular/core/testing';

import { WordpressService } from './wp-service.service';
import { ApiService } from '../api';
import { apiServiceMock } from '@core/mocks/api.service.mock';

describe('WpServiceService', () => {
  let service: WordpressService;
  let _apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            { provide: ApiService, useValue: apiServiceMock },
          ],
    });
  });
beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordpressService);
    _apiService = TestBed.inject(ApiService);

    service['baseUrl'] = 'https://example.com';
})

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
