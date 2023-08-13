import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '@core/models/cartItem';
import { CartService, UserService } from '@core/services';
import { MIN_DELIVERY, STEP_ADMIN_SUMMARY, STEP_DELIVERY } from '@shared/constants';

@Component({
  selector: 'app-cart-admin',
  templateUrl: './cart-admin.component.html',
  styleUrls: ['./cart-admin.component.css']
})
export class CartAdminComponent {
  cartItems: CartItem[] = [];
  total: number = 0;
  totalQuantity: number = 0;
  MIN_DELIVERY = MIN_DELIVERY;

  constructor(private _cartService: CartService, private _router: Router, private _userService: UserService) {}

  ngOnInit(): void {
    this._cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.total = this._cartService.getTotalAmount();
      this.totalQuantity = this._cartService.getTotalQuantity();
    });
  }

  addItemToCart(cartItem: CartItem ) {
    this._cartService.addToCart(cartItem.book, cartItem.quantity);
  }

  public removeFromCart(item: CartItem): void {
    this._cartService.removeFromCart(item.book);
  }

  public checkDeliveryAvilability(): boolean {
    return this.total >= MIN_DELIVERY;
  }

  public goToNextStep(): void {
    if(this._userService.isAdminUser()){
      this._router.navigate([STEP_ADMIN_SUMMARY]);
    }else{
      this._router.navigate([STEP_DELIVERY]);
    }
  }
}
