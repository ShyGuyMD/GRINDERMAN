import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CartItemComponent } from './cart-item.component';
import { CartItem } from '@core/models/cartItem';
import { mockBook1 } from '@core/mocks/book.service.mock';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  const mockCartItem: CartItem = {
    book: mockBook1, // Provide valid book data
    quantity: 2
  };
  
  beforeEach(waitForAsync ( () => {
   TestBed.configureTestingModule({
      declarations: [ CartItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    component.item = mockCartItem;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
