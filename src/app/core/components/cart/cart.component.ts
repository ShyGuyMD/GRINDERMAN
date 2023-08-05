import { Component, OnInit } from '@angular/core';
import { CartItem } from '@core/models/cartItem';
import { CartService } from '@core/services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  totalQuantity: number = 0;

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this._cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.calculateTotal();
      this.calculateTotalQuantity();
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce(
      (acc, cartItem) => acc + cartItem.book.price * cartItem.quantity,
      0
    );
  }

  calculateTotalQuantity(): void {
    this.totalQuantity = this.cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );
  }

  removeFromCart(item: CartItem): void {
    this._cartService.removeFromCart(item.book);
  }

  
}