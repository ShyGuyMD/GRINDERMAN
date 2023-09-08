import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookImportComponent } from './book-import.component';
import { bookServiceMock } from '@core/mocks/book.service.mock';
import { excelServiceMock } from '@core/mocks/excel.service.mock';
import { BookService } from '@core/services';
import { ExcelService } from '@core/services/excel-service/excel.service';
import { BookCatalogueComponent } from '../book-catalogue/book-catalogue.component';

describe('BookImportComponent', () => {
  let component: BookImportComponent;
  let fixture: ComponentFixture<BookImportComponent>;

  let _excelService: ExcelService;
  let _bookService: BookService;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ BookCatalogueComponent ],
      providers: [
        { provide: BookService, useValue: bookServiceMock },
        { provide: ExcelService, useValue: excelServiceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(()=>{
    fixture = TestBed.createComponent(BookImportComponent);
    component = fixture.componentInstance;
    _bookService = TestBed.inject(BookService);
    _excelService = TestBed.inject(ExcelService);

    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
