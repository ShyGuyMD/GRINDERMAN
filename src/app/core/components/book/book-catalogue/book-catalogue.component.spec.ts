import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BookCatalogueComponent } from '@core/components';
import { bookServiceMock } from '@core/mocks/book.service.mock';
import { routerMock } from '@core/mocks/router.mock';
import { sharedServiceMock } from '@core/mocks/sharedservice.mock';
import { wooCommerceApiServiceMock } from '@core/mocks/woocommerceapi.service.mock';
import { BookService, SharedService, WooCommerceApiService } from '@core/services';

describe('BookCatalogueComponent', () => {
  let component: BookCatalogueComponent;
  let fixture: ComponentFixture<BookCatalogueComponent>;

  let _router : Router;
  let _wooCommerceApiService: WooCommerceApiService;
  let _sharedService: SharedService;
  let _bookService: BookService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCatalogueComponent ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: BookService, useValue: bookServiceMock },
        { provide: SharedService, useValue: sharedServiceMock },
        { provide: WooCommerceApiService, useValue: wooCommerceApiServiceMock }
      ]
    })
    .compileComponents();

  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(BookCatalogueComponent);
    component = fixture.componentInstance;
    
    _bookService = TestBed.inject(BookService);
    _wooCommerceApiService = TestBed.inject(WooCommerceApiService);
    _sharedService = TestBed.inject(SharedService);
    _router = TestBed.inject(Router);

    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
