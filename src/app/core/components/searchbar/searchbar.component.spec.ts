import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { SearchbarComponent } from './searchbar.component';
import { NavigationService, SharedService, WooCommerceApiService } from '@core/services';
import { sharedServiceMock } from '@core/mocks/sharedservice.mock';
import { wooCommerceApiServiceMock } from '@core/mocks/woocommerceapi.service.mock';
import { debounceTime } from 'rxjs';
import { navigationServiceMock } from '@core/mocks/navigation.service.mock';
import { routerMock } from '@core/mocks/router.mock';
import { Route, Router } from '@angular/router';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  let _sharedService: SharedService;
  let _wooCommerceApiService: WooCommerceApiService;
  let _router: Router;
  let _navigationService: NavigationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchbarComponent],
      providers: [
        { provide: SharedService, useValue: sharedServiceMock },
        { provide: WooCommerceApiService, useValue: wooCommerceApiServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: NavigationService, useValue: navigationServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    _sharedService = TestBed.inject(SharedService);
    _wooCommerceApiService = TestBed.inject(WooCommerceApiService);
    _navigationService = TestBed.inject(NavigationService);
    _router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should perform search on handleSearchEvent', () => {
    const keyword = 'book';
    const setSearchResultsSpy = jest.spyOn(
      sharedServiceMock,
      'setSearchResults'
    );

    component.performSearch(keyword);

    expect(wooCommerceApiServiceMock.getProductsByKeyword).toHaveBeenCalledWith(
      keyword
    );
    expect(setSearchResultsSpy).toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
  });

  it('should perform search with debounceTime', () => {
    const keyword = 'book';
    const setSearchResultsSpy = jest.spyOn(
      sharedServiceMock,
      'setSearchResults'
    );

    component.handleSearchEvent(keyword);
    component.searchTerm.pipe(debounceTime(300)).subscribe({
      next: () => {
        expect(component.isLoading).toBe(true);
        expect(
          wooCommerceApiServiceMock.getProductsByKeyword
        ).toHaveBeenCalledWith(keyword);
        expect(setSearchResultsSpy).toHaveBeenCalled();
        expect(component.isLoading).toBe(false);
      },
    });
  });
});
