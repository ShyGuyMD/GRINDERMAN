import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderDetailsComponent } from './order-details.component';
import { cartServiceMock } from '@core/mocks/cart.service.mock';
import { navigationServiceMock } from '@core/mocks/navigation.service.mock';
import { orderServiceMock } from '@core/mocks/order.service.mock';
import { userServiceMock } from '@core/mocks/user.service.mock';
import { CartService, DeliveryService, NavigationService, OrderService, UserService } from '@core/services';
import { deliveryServiceMock } from '@core/mocks/delivery.service.mock';
import { MessageService } from 'primeng/api';

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;
  let _cartService: CartService;
  let _navigationService: NavigationService;
  let _orderService: OrderService;
  let _userService: UserService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailsComponent],
      providers: [
        { provide: CartService, useValue: cartServiceMock },
        { provide: NavigationService, useValue: navigationServiceMock },
        { provide: OrderService, useValue: orderServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: DeliveryService, useValue: deliveryServiceMock },
        MessageService
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;

    _cartService = TestBed.inject(CartService);
    _navigationService = TestBed.inject(NavigationService);
    _userService = TestBed.inject(UserService);
    _orderService = TestBed.inject(OrderService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});