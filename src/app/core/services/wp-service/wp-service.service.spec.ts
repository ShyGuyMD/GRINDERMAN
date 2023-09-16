import { TestBed } from '@angular/core/testing';

import { WordpressService } from './wp-service.service';

describe('WpServiceService', () => {
  let service: WordpressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordpressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
