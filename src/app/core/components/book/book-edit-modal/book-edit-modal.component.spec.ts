import { ComponentFixture, TestBed, tick, waitForAsync } from '@angular/core/testing';
import {
  bookServiceMock,
  mockBook1,
  mockGenres,
} from '@core/mocks/book.service.mock';
import { dynamicDialogRefMock } from '@core/mocks/dynamicdialogref.mock';
import { productServiceMock } from '@core/mocks/product.service.mock';
import { wooCommerceApiServiceMock } from '@core/mocks/woocommerceapi.service.mock';
import {
  BookService,
  ProductService,
  UtilsService,
  WooCommerceApiService,
} from '@core/services';
import {
  DynamicDialogRef,
  DynamicDialogConfig,
  DialogService,
} from 'primeng/dynamicdialog';
import { BookEditModalComponent } from './book-edit-modal.component';
import { FormsModule, NgForm } from '@angular/forms';
import { dialogServiceMock } from '@core/mocks/dialog.service.mock';

describe('BookEditModalComponent', () => {
  let component: BookEditModalComponent;
  let fixture: ComponentFixture<BookEditModalComponent>;

  let _bookService: BookService;
  let _productService: ProductService;
  let _wooCommerceAPIService: WooCommerceApiService;
  let _dynamicDialogRef: DynamicDialogRef;
  let _dynamicDialogConfig: DynamicDialogConfig;
  let _utilService: UtilsService;
  let _dialogService: DialogService;

  const configMock: Partial<DynamicDialogConfig> = {
    data: {
      bookId: mockBook1.id,
      bookData: mockBook1, // Provide your test data here
    },
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BookEditModalComponent],
      imports: [FormsModule],
      providers: [
        { provide: NgForm, useValue: {} },
        { provide: BookService, useValue: bookServiceMock },
        { provide: ProductService, useValue: productServiceMock },
        { provide: WooCommerceApiService, useValue: wooCommerceApiServiceMock },
        { provide: DynamicDialogRef, useValue: dynamicDialogRefMock },
        { provide: DynamicDialogConfig, useValue: configMock },
        { provide: UtilsService },
        { provide: DialogService, useValue: dialogServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditModalComponent);
    component = fixture.componentInstance;
    component.book = mockBook1; 

    _bookService = TestBed.inject(BookService);
    _productService = TestBed.inject(ProductService);
    _wooCommerceAPIService = TestBed.inject(WooCommerceApiService);
    _dynamicDialogRef = TestBed.inject(DynamicDialogRef);
    _dynamicDialogConfig = TestBed.inject(DynamicDialogConfig);
    _utilService = TestBed.inject(UtilsService);
    _dialogService = TestBed.inject(DialogService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
