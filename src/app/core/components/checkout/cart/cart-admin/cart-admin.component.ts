import { Component } from '@angular/core';
import { CartItem } from '@core/models/cartItem';
import { Coupon } from '@core/models/coupon';
import { CartService, NavigationService, UserService } from '@core/services';
import {
  MIN_DELIVERY,
  CHECKOUT_ORDER_SUMMARY,
  CouponType,
} from '@shared/constants';

@Component({
  selector: 'app-cart-admin',
  templateUrl: './cart-admin.component.html',
  styleUrls: ['./cart-admin.component.css'],
})
export class CartAdminComponent {
  cartItems: CartItem[] = [];
  total: number = 0;
  totalQuantity: number = 0;
  coupon: Coupon | null = null;
  MIN_DELIVERY = MIN_DELIVERY;
  public mercadoLibre : boolean = false;

  constructor(
    private _cartService: CartService,
    private _navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this._cartService.getCartItems().subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.totalQuantity = this._cartService.getTotalQuantity();
      this.total = this._cartService.getTotalAmount();
      this._cartService.getCoupon().subscribe((response)=>{
        this.coupon = response;
        this.total = this._cartService.getTotalAmountWithCoupons();
      })
      this._cartService.getMercadoLibre().subscribe((mercadoLibre) =>
      {
        this.mercadoLibre = mercadoLibre;
      })
    });
  }

  addItemToCart(cartItem: CartItem) {
    this._cartService.addToCart(cartItem.book, cartItem.quantity);
  }

  public removeFromCart(item: CartItem): void {
    this._cartService.removeFromCart(item.book);
  }

  public checkDeliveryAvilability(): boolean {
    return this.total >= MIN_DELIVERY;
  }

  public goToNextStep(): void {
    this._navigationService.navigateTo(CHECKOUT_ORDER_SUMMARY);
  }

  onCheckboxChange(newValue: boolean) {
    this._cartService.setMercadoLibre(newValue);
  }

}
