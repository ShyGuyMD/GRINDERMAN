import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InventoryReportComponent } from './inventory-report.component';
import { BookService } from '@core/services';
import { bookServiceMock } from '@core/mocks/book.service.mock';
import { ExcelService } from '@core/services/excel-service/excel.service';
import { excelServiceMock } from '@core/mocks/excel.service.mock';
import { DialogService } from 'primeng/dynamicdialog';
import { dialogServiceMock } from '@core/mocks/dialog.service.mock';
import { TableService } from '@core/services/inventory';
import { MessageService } from 'primeng/api';
import { inventoryServiceMock } from '@core/mocks/inventory.service.mock';

describe('InventoryReportComponent', () => {
  let component: InventoryReportComponent;
  let fixture: ComponentFixture<InventoryReportComponent>;

  let _inventoryService: TableService;
  let _bookService: BookService;
  let _excelService: ExcelService;
  let _dialogService: DialogService

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ InventoryReportComponent ],
      providers: [
        { provide: TableService, useValue: inventoryServiceMock },
        { provide: BookService, useValue: bookServiceMock },
        { provide: ExcelService, useValue: excelServiceMock},
        { provide: DialogService, useValue: dialogServiceMock},
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
  
    fixture = TestBed.createComponent(InventoryReportComponent);
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


