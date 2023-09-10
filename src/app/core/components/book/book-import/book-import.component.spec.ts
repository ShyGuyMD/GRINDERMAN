import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookImportComponent } from './book-import.component';
import { bookServiceMock } from '@core/mocks/book.service.mock';
import { excelServiceMock } from '@core/mocks/excel.service.mock';
import { BookService } from '@core/services';
import { ExcelService } from '@core/services/excel-service/excel.service';
import { BookCatalogueComponent } from '../book-catalogue/book-catalogue.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { dialogServiceMock } from '@core/mocks/dialog.service.mock';
import { DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';

describe('BookImportComponent', () => {
  let component: BookImportComponent;
  let fixture: ComponentFixture<BookImportComponent>;

  let _excelService: ExcelService;
  let _bookService: BookService;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ BookCatalogueComponent ],
      imports:  [FormsModule, ReactiveFormsModule, DropdownModule],
      providers: [
        { provide: BookService, useValue: bookServiceMock },
        { provide: ExcelService, useValue: excelServiceMock },
        { provide: DialogService, useValue: dialogServiceMock },
        MessageService,
        ConfirmationService,
        FormBuilder
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
