import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, UserService } from '@core/services';
import { STEP_ADMIN_CART, STEP_CART } from '@shared/constants';

@Component({
    selector: 'app-cartpreview',
    templateUrl: './cart-preview.component.html',
    styleUrls: ['./cart-preview.component.css']
})
export class CartPreviewComponent {
    public quantity: number = 3;
    public totalAmount: number = 1500;

    constructor(private _cartService: CartService, private _userService: UserService) { }

    ngOnInit(): void {
        this._cartService.cartItems$.subscribe(() => {
            this.quantity = this._cartService.getTotalQuantity();
            this.totalAmount = this._cartService.getTotalAmount();
        });
    }

    public viewCart(): string {
        if (this._userService.isAdminUser()) {
            return STEP_ADMIN_CART;
        } else {
            return STEP_CART;
        }
    }

}
