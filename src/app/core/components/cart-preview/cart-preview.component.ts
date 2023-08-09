import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@core/services';

@Component({
    selector: 'app-cartpreview',
    templateUrl: './cart-preview.component.html',
    styleUrls: ['./cart-preview.component.css']
})
export class CartPreviewComponent {
    public quantity: number = 3;
    public totalAmount: number = 1500;

    constructor(private _cartService: CartService, private _router: Router) {}
    
      ngOnInit(): void {
        this._cartService.cartItems$.subscribe(() => {
          this.quantity = this._cartService.getTotalQuantity();
          this.totalAmount = this._cartService.getTotalAmount();
        });
      }
    
}
