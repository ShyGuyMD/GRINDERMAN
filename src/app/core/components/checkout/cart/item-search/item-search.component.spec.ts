import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItemSearchComponent } from './item-search.component';
import { wooCommerceApiServiceMock } from '@core/mocks/woocommerceapi.service.mock';
import {
  BookService,
  NavigationService,
  SharedService,
  WooCommerceApiService,
} from '@core/services';
import { bookServiceMock } from '@core/mocks/book.service.mock';
import { navigationServiceMock } from '@core/mocks/navigation.service.mock';
import { sharedServiceMock } from '@core/mocks/sharedservice.mock';

describe('ItemSearchComponent', () => {
  let component: ItemSearchComponent;
  let fixture: ComponentFixture<ItemSearchComponent>;

  let _wooCommerceAPIService: WooCommerceApiService;
  let _navigationService: NavigationService;
  let _sharedService: SharedService;
  let _bookService: BookService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItemSearchComponent],
      providers: [
        { provide: BookService, useValue: bookServiceMock },
        { provide: SharedService, useValue: sharedServiceMock },
        { provide: NavigationService, useValue: navigationServiceMock },
        { provide: WooCommerceApiService, useValue: wooCommerceApiServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSearchComponent);
    component = fixture.componentInstance;

    _bookService = TestBed.inject(BookService);
    _navigationService = TestBed.inject(NavigationService);
    _sharedService = TestBed.inject(SharedService);
    _wooCommerceAPIService = TestBed.inject(WooCommerceApiService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
