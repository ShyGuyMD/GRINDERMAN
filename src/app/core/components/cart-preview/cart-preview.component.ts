import { Component } from '@angular/core';
import { CartService, NavigationService, UserService } from '@core/services';
import { CHECKOUT_CART } from '@shared/constants';

@Component({
  selector: 'app-cartpreview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.css'],
})
export class CartPreviewComponent {
  public quantity: number = 3;
  public totalAmount: number = 1500;

  constructor(
    private _cartService: CartService,
    private _navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this._cartService.getCartItems().subscribe(() => {
      this.quantity = this._cartService.getTotalQuantity();
      this.totalAmount = this._cartService.getTotalAmount();
    });
  }

  public goToCart() {
    this._navigationService.navigateTo(CHECKOUT_CART);
  }
}
