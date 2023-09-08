import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BookCatalogueComponent } from '@core/components';
import { bookServiceMock } from '@core/mocks/book.service.mock';
import { cartServiceMock } from '@core/mocks/cart.service.mock';
import { navigationServiceMock } from '@core/mocks/navigation.service.mock';
import { sharedServiceMock } from '@core/mocks/sharedservice.mock';
import { BookService, CartService, NavigationService, SharedService} from '@core/services';

describe('BookCatalogueComponent', () => {
  let component: BookCatalogueComponent;
  let fixture: ComponentFixture<BookCatalogueComponent>;

  let _router : Router;
  let _navigationService: NavigationService;
  let _sharedService: SharedService;
  let _bookService: BookService;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ BookCatalogueComponent ],
      providers: [
        { provide: BookService, useValue: bookServiceMock },
        { provide: SharedService, useValue: sharedServiceMock },
        { provide: NavigationService, useValue: navigationServiceMock },
        { provide: CartService, useValue: cartServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(()=>{
    fixture = TestBed.createComponent(BookCatalogueComponent);
    component = fixture.componentInstance;
    
    _bookService = TestBed.inject(BookService);
    _navigationService = TestBed.inject(NavigationService);
    _sharedService = TestBed.inject(SharedService);
    _router = TestBed.inject(Router);

    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
