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
    cartTotal: number = 0;

    constructor(private _cartService: CartService) { }

    ngOnInit(): void {
        this._cartService.getCartItems().subscribe((cartItems) => {
            this.cartItems = cartItems;
        });

        this.cartTotal = this._cartService.getTotalAmount();
    }

    getLineTotal(selectedItem: CartItem): number {
        return selectedItem.quantity * selectedItem.book.price;
    }

}