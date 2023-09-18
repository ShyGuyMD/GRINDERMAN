import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PriceUpdateComponent } from './price-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { bookServiceMock } from '@core/mocks/book.service.mock';
import { dialogServiceMock } from '@core/mocks/dialog.service.mock';
import { excelServiceMock } from '@core/mocks/excel.service.mock';
import { inventoryServiceMock } from '@core/mocks/inventory.service.mock';
import { BookService } from '@core/services';
import { ExcelService } from '@core/services/excel-service/excel.service';
import { TableService } from '@core/services/inventory';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

describe('PriceUpdateComponent', () => {
  let component: PriceUpdateComponent;
  let fixture: ComponentFixture<PriceUpdateComponent>;
  let _inventoryService: TableService;
  let _bookService: BookService;
  let _excelService: ExcelService;
  let _dialogService: DialogService

  const configMock: Partial<DynamicDialogConfig> = {
    data: {
    },
  };

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ PriceUpdateComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: TableService, useValue: inventoryServiceMock },
        { provide: BookService, useValue: bookServiceMock },
        { provide: ExcelService, useValue: excelServiceMock},
        { provide: DialogService, useValue: dialogServiceMock},
        { provide: DynamicDialogConfig, useValue: configMock},
        ConfirmationService,
        DynamicDialogRef,
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
  
    fixture = TestBed.createComponent(PriceUpdateComponent);
    component = fixture.componentInstance;

    _inventoryService = TestBed.inject(TableService);
    _bookService = TestBed.inject(BookService);
    _dialogService = TestBed.inject(DialogService);
    _excelService = TestBed.inject(ExcelService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
