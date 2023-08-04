import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { bookServiceMock, mockBook1 } from "@core/mocks/book.service.mock";
import { dynamicDialogRefMock } from "@core/mocks/dynamicdialogref.mock";
import { productServiceMock } from "@core/mocks/product.service.mock";
import { wooCommerceApiServiceMock } from "@core/mocks/woocommerceapi.service.mock";
import { BookService, ProductService, UtilsService, WooCommerceApiService } from "@core/services";
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from "primeng/dynamicdialog";
import { BookEditModalComponent } from "./book-edit-modal.component";
import { FormsModule, NgForm } from "@angular/forms";


describe('BookEditModalComponent', () => {
  let component: BookEditModalComponent;
  let fixture: ComponentFixture<BookEditModalComponent>;

  let _bookService: BookService;
  let _productService: ProductService;
  let _wooCommerceAPIService: WooCommerceApiService;
  let _dynamicDialogRef: DynamicDialogRef;
  let _dynamicDialogConfig: DynamicDialogConfig;

  const configMock: Partial<DynamicDialogConfig> = {
    data: {
      bookId: mockBook1.id,
      bookData: mockBook1 // Provide your test data here
    }
    };

  beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ BookEditModalComponent ],
        imports: [FormsModule],
        providers: [
          { provide: NgForm, useValue: {} },
          { provide: BookService, useValue: bookServiceMock },
          { provide: ProductService, useValue: productServiceMock },
          { provide: WooCommerceApiService, useValue: wooCommerceApiServiceMock },
          { provide: DynamicDialogRef, useValue: dynamicDialogRefMock },
          { provide: DynamicDialogConfig, useValue: configMock },
          { provide: UtilsService},
          DialogService,]
      }).compileComponents();
    })
  );
  beforeEach( () => {
    fixture = TestBed.createComponent(BookEditModalComponent);
    component = fixture.componentInstance;

    _bookService = TestBed.inject(BookService);
    _productService = TestBed.inject(ProductService);
    _wooCommerceAPIService = TestBed.inject(WooCommerceApiService);
    _dynamicDialogConfig = TestBed.inject(DynamicDialogConfig);
    _dynamicDialogRef = TestBed.inject(DynamicDialogRef);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
