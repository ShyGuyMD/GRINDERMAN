import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { navigationServiceMock } from '@core/mocks/navigation.service.mock';
import { cartServiceMock } from '@core/mocks/cart.service.mock';
import { CartService, NavigationService } from '@core/services';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let _cartService: CartService;
  let _navigationService: NavigationService;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        { provide: CartService, useValue: cartServiceMock },
        { provide: NavigationService, useValue: navigationServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;

    _cartService = TestBed.inject(CartService);
    _navigationService = TestBed.inject(NavigationService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
