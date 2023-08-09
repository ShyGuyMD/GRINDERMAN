import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '@core/models/cartItem';
import { CartService } from '@core/services';
import { MIN_DELIVERY } from '@shared/constants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  totalQuantity: number = 0;
  MIN_DELIVERY = MIN_DELIVERY;

  constructor(private _cartService: CartService, private _router: Router) {}

  ngOnInit(): void {
    this._cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.total = this._cartService.getTotalAmount();
      this.totalQuantity = this._cartService.getTotalQuantity();
    });
  }


  public removeFromCart(item: CartItem): void {
    this._cartService.removeFromCart(item.book);
  }

  public checkDeliveryAvilability(): boolean {
    return this.total >= MIN_DELIVERY;
  }

  public goToNextStep(): void {
    this._router.navigate(['/checkout/delivery-options']);
  }

  
}