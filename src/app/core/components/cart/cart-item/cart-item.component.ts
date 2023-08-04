import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '@core/models/cartItem';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() remove: EventEmitter<void> = new EventEmitter();
}
