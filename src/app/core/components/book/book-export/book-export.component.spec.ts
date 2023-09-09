import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookExportComponent } from './book-export.component';
import { ExcelService } from '@core/services/excel-service/excel.service';
import { bookServiceMock } from '@core/mocks/book.service.mock';
import { excelServiceMock } from '@core/mocks/excel.service.mock';
import { BookService } from '@core/services';
import { BookCatalogueComponent } from '../book-catalogue/book-catalogue.component';

describe('BookExportComponent', () => {
  let component: BookExportComponent;
  let fixture: ComponentFixture<BookExportComponent>;

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
    fixture = TestBed.createComponent(BookExportComponent);
    component = fixture.componentInstance;
    _bookService = TestBed.inject(BookService);
    _excelService = TestBed.inject(ExcelService);

    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
