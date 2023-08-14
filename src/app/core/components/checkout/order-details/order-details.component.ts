import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '@core/models/cartItem';
import { OrderDetails } from '@core/models/orderDetails';
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
        private _router: Router,
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
        this._router.navigate(['']);
    }

    public goToPreviousStep(): void {
        this._router.navigate(['/checkout/cart']);
    }

    public placeOrder(): void {
        const request = this._orderService.mapOrderRequest(this.orderDetails);

        this._orderService.createOrder(request).subscribe({
            next: (v) => {
                console.log('Order Create Success!');
                console.log('Order Info: ', v);
                // TODO: Redirect to an actual page.
                this._router.navigate(['/blank'], { queryParams: { success : 'Order Create Success!'} });
                this._cartService.clearCart();
            },
            error: (e) => {
                console.error('Order Create Error: ', e);
                this._router.navigate(['/blank'], { queryParams: { error: 'Error Creating Order' } });
            }
        })
    }
}
