import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookDetailComponent } from './book-detail.component';
import { BookService, WooCommerceApiService } from '@core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { activatedRouteMock } from '@core/mocks/activatedroute.mock';
import { routerMock } from '@core/mocks/router.mock';
import { bookServiceMock, mockBook1 } from '@core/mocks/book.service.mock';
import { wooCommerceApiServiceMock } from '@core/mocks/woocommerceapi.service.mock';
import { Book } from '@core/models/book';
import { of, throwError } from 'rxjs';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let _activatedRoute: any;
  let _router: any;
  let _bookService: BookService;
  let _wooCommerceApiService: WooCommerceApiService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BookDetailComponent],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRouteMock },
          { provide: Router, useValue: routerMock },
          { provide: BookService, useValue: bookServiceMock },
          { provide: WooCommerceApiService, useValue: wooCommerceApiServiceMock }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;

    _bookService = TestBed.inject(BookService);
    _wooCommerceApiService = TestBed.inject(WooCommerceApiService);
    _activatedRoute = TestBed.inject(ActivatedRoute);
    _router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component with a valid ID', () => {
    const mockBook: Book = mockBook1;
    (<jest.Mock>_activatedRoute.snapshot.paramMap.get).mockReturnValue(mockBook.id);
    (<jest.Mock>_bookService.mapProductToBook).mockReturnValue(mockBook);
    (<jest.Mock>_wooCommerceApiService.getProductsById).mockReturnValue(of({}));

    fixture.detectChanges();

    expect(_activatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith("id");
    expect(_activatedRoute.snapshot.paramMap.get).toReturnWith(mockBook.id);
    expect(_bookService.mapProductToBook).toHaveBeenCalledWith({});
    expect(component.book).toBe(mockBook);
  });

  it('should handle an invalid ID', () => {
    _activatedRoute.snapshot.paramMap.get.mockReturnValue(null);

    fixture.detectChanges();

    expect(_activatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(_router.navigate).toHaveBeenCalledWith(['/blank'], { queryParams: { error: 'Invalid ID or non-number value.' } });
  });

  it('should handle an error retrieving the product', () => {
    (<jest.Mock>_activatedRoute.snapshot.paramMap.get).mockReturnValue(1);
    (<jest.Mock>_wooCommerceApiService.getProductsById).mockReturnValue(throwError(() => new Error('Error')))

    fixture.detectChanges();

    expect(_wooCommerceApiService.getProductsById).toHaveBeenCalledWith(1);
    expect(_router.navigate).toHaveBeenCalledWith(['/blank'], { queryParams: { error: 'Error retrieving product.' } });
  });
});