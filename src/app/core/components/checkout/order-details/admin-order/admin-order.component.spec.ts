import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderComponent } from './admin-order.component';
import { CartService, OrderService, UserService } from '@core/services';
import { userServiceMock } from '@core/mocks/user.service.mock';
import { orderServiceMock } from '@core/mocks/order.service.mock';
import { cartServiceMock } from '@core/mocks/cart.service.mock';

describe('AdminOrderComponent', () => {
  let component: AdminOrderComponent;
  let fixture: ComponentFixture<AdminOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderComponent ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: OrderService, useValue: orderServiceMock },
        { provide: CartService, useValue: cartServiceMock}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
