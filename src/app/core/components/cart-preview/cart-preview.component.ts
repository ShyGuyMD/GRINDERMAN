import { Component } from '@angular/core';
import { CartService, UserService } from '@core/services';
import {CHECKOUT_CART } from '@shared/constants';

@Component({
    selector: 'app-cartpreview',
    templateUrl: './cart-preview.component.html',
    styleUrls: ['./cart-preview.component.css']
})
export class CartPreviewComponent {
    public quantity: number = 3;
    public totalAmount: number = 1500;
    public CHECKOUT_CART = CHECKOUT_CART;

    constructor(private _cartService: CartService, private _userService: UserService) {}
    
      ngOnInit(): void {
        this._cartService.cartItems$.subscribe(() => {
          this.quantity = this._cartService.getTotalQuantity();
          this.totalAmount = this._cartService.getTotalAmount();
        });
      }
    
}
