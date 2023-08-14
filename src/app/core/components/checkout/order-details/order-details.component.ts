import { Component } from '@angular/core';
import { NavigationService } from '@core/services';
import { BLANK_PAGE, CHECKOUT_CART } from '@shared/constants';
import { CartItem } from '@core/models/cartItem';
import { OrderDetails } from '@core/models/orderDetails';
import { CreateOrderResponse } from '@core/models/response/orderResponse';
import { CartService, OrderService, UserService } from '@core/services';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

    public cartItems : CartItem[] = [];
    public orderDetails! : OrderDetails;

    constructor(
        private _navigationService: NavigationService,
        private _cartService: CartService,
        private _orderService: OrderService,
        private _userService: UserService
    ) { }

    ngOnInit() {
        this._cartService.cartItems$.subscribe((cartItems) => {
            this.cartItems = cartItems;
        });

        this.orderDetails = {
            user: this._userService.getActiveUser(),
            cartItems : this.cartItems
        }
    }

    public goToNextStep(): void {
      this._navigationService.navigateTo('');
    }

    public goToPreviousStep(): void {
      this._navigationService.navigateTo(CHECKOUT_CART);
    }

    public placeOrder(): void {
        const request = this._orderService.mapOrderRequest(this.orderDetails);

        this._orderService.createOrder(request).subscribe({
            next: (response: CreateOrderResponse) => {
                console.log('Order Create Success!');
                console.log('Order Info: ', response);
                // TODO: Redirect to an actual page.
                this._navigationService.navigateTo(BLANK_PAGE, undefined, 'Order Create Success!');
                this._cartService.clearCart();
            },
            error: (e) => {
                console.error('Order Create Error: ', e);
                this._navigationService.navigateTo(BLANK_PAGE, 'Error Creating Order');
            }
        })
    }
}
