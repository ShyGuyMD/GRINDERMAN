import { Component } from '@angular/core';
import { CartItem } from '@core/models/cartItem';
import { Coupon } from '@core/models/coupon';
import { OrderDetails } from '@core/models/orderDetails';
import { CreateOrderResponse } from '@core/models/response/orderResponse';
import { MessageService } from 'primeng/api';
import { CartService, NavigationService, OrderService, UserService } from '@core/services';
import { CHECKOUT_CART, Severity } from '@shared/constants';

@Component({
    selector: 'app-admin-order',
    templateUrl: './admin-order.component.html',
    styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent {

    public cartItems: CartItem[] = [];
    public orderDetails !: OrderDetails;
    public coupon: Coupon | null = null;
    public mercadoLibre: boolean = false;
    public isLoading: boolean = false;

    constructor(
        private _cartService: CartService,
        private _messageService: MessageService,
        private _navigationService: NavigationService,
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
        });

        this._cartService.getMercadoLibre().subscribe((isMercadoLibre) => {
            this.mercadoLibre = isMercadoLibre;
        })
    }

    public placeOrder(): void {
        this.isLoading = true;

        this._orderService.registerManualOrder(this.orderDetails, this.coupon, this.mercadoLibre).subscribe({
            next: (response: CreateOrderResponse) => {
                this._messageService.add({
                    severity: Severity.SUCCESS,
                    summary: 'Órden creada con éxito!',
                    detail: `La órden número ${response.id} ha sido creada con éxito`,
                });
                this._cartService.clearCart();
                this._navigationService.navigateTo(CHECKOUT_CART);
            },
            error: (e) => {
                console.log('the error:', e);
                this._messageService.add({
                    severity: Severity.ERROR,
                    summary: '¡Upss!',
                    detail: `Ha ocurrido un error en el registro de la compra.`,
                });
            },
            complete: () => {
                this.isLoading = false;
            }
        })
    }
}
