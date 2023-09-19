import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookDetailAdminComponent } from './book-detail-admin.component';
import { ActivatedRoute } from '@angular/router';
import { activatedRouteMock } from '@core/mocks/activatedroute.mock';
import { bookServiceMock } from '@core/mocks/book.service.mock';
import { cartServiceMock } from '@core/mocks/cart.service.mock';
import { dialogServiceMock } from '@core/mocks/dialog.service.mock';
import { navigationServiceMock } from '@core/mocks/navigation.service.mock';
import { BookService, CartService, NavigationService } from '@core/services';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

describe('BookDetailAdminComponent', () => {
  let component: BookDetailAdminComponent;
  let fixture: ComponentFixture<BookDetailAdminComponent>;
  let _activatedRoute: ActivatedRoute;
  let _navigationService: NavigationService;
  let _bookService: BookService;
  let _dialogService: DialogService;
  let _cartService: CartService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BookDetailAdminComponent],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRouteMock },
          { provide: NavigationService, useValue: navigationServiceMock },
          { provide: BookService, useValue: bookServiceMock },
          { provide: DialogService, useValue: dialogServiceMock },
          { provide: CartService, useValue: cartServiceMock },
          MessageService
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailAdminComponent);
    component = fixture.componentInstance;

    _bookService = TestBed.inject(BookService);
    _dialogService = TestBed.inject(DialogService);
    _activatedRoute = TestBed.inject(ActivatedRoute);
    _navigationService = TestBed.inject(NavigationService);
    _cartService = TestBed.inject(CartService);

  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
