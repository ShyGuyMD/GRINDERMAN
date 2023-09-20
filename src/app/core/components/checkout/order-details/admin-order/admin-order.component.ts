import { Component } from '@angular/core';
import { CartItem } from '@core/models/cartItem';
import { Coupon } from '@core/models/coupon';
import { OrderDetails } from '@core/models/orderDetails';
import { CartService, OrderService, UserService } from '@core/services';

@Component({
    selector: 'app-admin-order',
    templateUrl: './admin-order.component.html',
    styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent {

    public cartItems : CartItem[] = [];
    public orderDetails !: OrderDetails;
    public coupon : Coupon | null = null;
    public mercadoLibre : boolean = false;

    constructor(
        private _cartService: CartService,
        private _orderService: OrderService,
        private _userService: UserService
    ) { }

    ngOnInit() {
        this._cartService.getCartItems().subscribe((cartItems) => {
            this.cartItems = cartItems;
        });

        this.orderDetails = {
            user: this._userService.getActiveUserData(),
            cartItems: this.cartItems,
        };

        this._cartService.getCoupon().subscribe((coupon) => {
            this.coupon = coupon;
        })
    }

    public placeOrder(): void {
        /*
        const request = this._orderService.registerManualOrder(this.orderDetails, this.coupon);

        this._orderService.createOrder(request).subscribe({
            next: (response: CreateOrderResponse) => {
                console.log('Order Create Success!');
                console.log('Order Info: ', response);
                // TODO: Redirect to an actual page.
                this._navigationService.navigateTo(
                    BLANK_PAGE,
                    undefined,
                    'Order Create Success!'
                );
                this._cartService.clearCart();
            },
            error: (e) => {
                console.error('Order Create Error: ', e);
                this._navigationService.navigateTo(
                    BLANK_PAGE,
                    'Error Creating Order'
                );
            },
        });
        this._navigationService.navigateTo(BLANK_PAGE, 'Error Creating Order');*/
    }
}
