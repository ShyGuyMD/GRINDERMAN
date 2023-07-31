import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { bookServiceMock } from "@core/mocks/book.service.mock";
import { dynamicDialogConfigMock } from "@core/mocks/dynamicdialogconfig.mock";
import { dynamicDialogRefMock } from "@core/mocks/dynamicdialogref.mock";
import { productServiceMock } from "@core/mocks/product.service.mock";
import { wooCommerceApiServiceMock } from "@core/mocks/woocommerceapi.service.mock";
import { BookService, ProductService, WooCommerceApiService } from "@core/services";
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from "primeng/dynamicdialog";
import { BookEditModalComponent } from "./book-edit-modal.component";
import { FormsModule } from "@angular/forms";


describe('BookEditModalComponent', () => {
  let component: BookEditModalComponent;
  let fixture: ComponentFixture<BookEditModalComponent>;
  let _bookService: BookService;


  beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ BookEditModalComponent ],
        imports: [FormsModule],
        providers: [
          { provide: BookService, useClass: bookServiceMock },
          { provide: ProductService, useClass: productServiceMock },
          { provide: WooCommerceApiService, useClass: wooCommerceApiServiceMock },
          { provide: DynamicDialogRef, useClass: dynamicDialogRefMock },
          { provide: DynamicDialogConfig, useClass: dynamicDialogConfigMock },
          DialogService,]
      }).compileComponents();
    })
  );
  beforeEach( () => {
    fixture = TestBed.createComponent(BookEditModalComponent);
    component = fixture.componentInstance;
    _bookService = TestBed.inject(BookService);
    console.log('Component created:', component);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
