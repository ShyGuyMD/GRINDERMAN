import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';


import { BookService, OrderService } from '@core/services';
import { bookServiceMock } from '@core/mocks/book.service.mock';
import { ExcelService } from '@core/services/excel-service/excel.service';
import { excelServiceMock } from '@core/mocks/excel.service.mock';
import { TableService } from '@core/services/inventory';
import { MessageService } from 'primeng/api';
import { inventoryServiceMock } from '@core/mocks/inventory.service.mock';
import { OrderReportComponent } from '@core/components';
import { orderServiceMock } from '@core/mocks/order.service.mock';

describe('OrderReportComponent', () => {
  let component: OrderReportComponent;
  let fixture: ComponentFixture<OrderReportComponent>;

  let _tableService: TableService;
  let _bookService: BookService;
  let _excelService: ExcelService;
  let _orderService: OrderService;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ OrderReportComponent ],
      providers: [
        { provide: TableService, useValue: inventoryServiceMock },
        { provide: BookService, useValue: bookServiceMock },
        { provide: ExcelService, useValue: excelServiceMock},
        { provide: OrderService, useValue: orderServiceMock},
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
  
    fixture = TestBed.createComponent(OrderReportComponent);
    component = fixture.componentInstance;

    _tableService = TestBed.inject(TableService);
    _bookService = TestBed.inject(BookService);
    _excelService = TestBed.inject(ExcelService);
    _orderService = TestBed.inject(OrderService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
