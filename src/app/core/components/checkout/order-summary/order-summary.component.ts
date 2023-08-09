import { Component } from '@angular/core';
import { CartItem } from '@core/models/cartItem';
import { CartService } from '@core/services';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  cartItems: CartItem[] = [];
  total: number = 0;
  
  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this._cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.total = this._cartService.getTotalAmount();
    });
  }

  getSubtotal(selectedItem: CartItem): number {
    return selectedItem.quantity * selectedItem.book.price;
  }

}
