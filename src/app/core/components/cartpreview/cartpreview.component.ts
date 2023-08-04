import { Component } from '@angular/core';
import { CartService } from '@core/services';

@Component({
    selector: 'app-cartpreview',
    templateUrl: './cartpreview.component.html',
    styleUrls: ['./cartpreview.component.css']
})
export class CartpreviewComponent {
    public quantity: number = 3;
    public totalAmount: number = 1500;

    constructor(private _cartService: CartService) {}
    
      ngOnInit(): void {
        this._cartService.cartItems$.subscribe(() => {
          this.quantity = this._cartService.getTotalQuantity();
          this.totalAmount = this._cartService.getTotalAmount();
        });
      }
}
