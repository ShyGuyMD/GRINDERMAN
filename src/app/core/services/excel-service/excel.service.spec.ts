import { TestBed } from '@angular/core/testing';

import { ExcelService } from './excel.service';
import { BookService } from '../book';
import { bookServiceMock } from '@core/mocks/book.service.mock';

describe('ImportService', () => {
  let service: ExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
     providers: [
       ExcelService,
       { provide: BookService, useValue: bookServiceMock },
     ],
   });
   service = TestBed.inject(ExcelService);
 });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
