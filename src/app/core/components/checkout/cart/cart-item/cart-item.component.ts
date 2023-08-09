import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '@core/models/cartItem';
import { CartService } from '@core/services';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() remove: EventEmitter<void> = new EventEmitter();

  constructor(private _cartService: CartService) {}

  onQuantityChange(): void {
    if (this.item.quantity < 1) {
      this.item.quantity = 1;
    } else if (this.item.quantity > this.item.book.availableUnits) {
      this.item.quantity = this.item.book.availableUnits;
    }
    this._cartService.updateQuantity(this.item.book, this.item.quantity);
  }

  getSubtotal(): number {
    return this.item.quantity * this.item.book.price;
  }
}
