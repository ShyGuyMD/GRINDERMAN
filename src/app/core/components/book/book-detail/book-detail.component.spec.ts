import { ComponentFixture, waitForAsync, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { activatedRouteMock } from "@core/mocks/activatedroute.mock";
import { bookServiceMock } from "@core/mocks/book.service.mock";
import { dialogServiceMock } from "@core/mocks/dialog.service.mock";
import { routerMock } from "@core/mocks/router.mock";
import { BookService, CartService, NavigationService } from "@core/services";
import { DialogService } from "primeng/dynamicdialog";
import { BookDetailComponent } from "./book-detail.component";
import { navigationServiceMock } from "@core/mocks/navigation.service.mock";
import { cartServiceMock } from "@core/mocks/cart.service.mock";

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let _activatedRoute: ActivatedRoute;
  let _navigationService: NavigationService;
  let _bookService: BookService;
  let _dialogService: DialogService;
  let _cartService: CartService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BookDetailComponent],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRouteMock },
          { provide: NavigationService, useValue: navigationServiceMock },
          { provide: BookService, useValue: bookServiceMock },
          { provide: DialogService, useValue: dialogServiceMock },
          { provide: CartService, useValue: cartServiceMock }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;

    _bookService = TestBed.inject(BookService);
    _dialogService = TestBed.inject(DialogService);
    _activatedRoute = TestBed.inject(ActivatedRoute);
    _navigationService = TestBed.inject(NavigationService);
    _cartService = TestBed.inject(CartService);

  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  
});