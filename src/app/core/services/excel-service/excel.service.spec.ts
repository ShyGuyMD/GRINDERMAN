import { TestBed } from '@angular/core/testing';

import { ExcelService } from './excel.service';

describe('ImportService', () => {
  let service: ExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
