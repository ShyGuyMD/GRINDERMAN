import { Component } from '@angular/core';
import { DeliveryService, NavigationService } from '@core/services';
import { BLANK_PAGE, CHECKOUT_CART, Severity } from '@shared/constants';
import { CartItem } from '@core/models/cartItem';
import { OrderDetails } from '@core/models/orderDetails';
import { CreateOrderResponse } from '@core/models/response/orderResponse';
import { CartService, OrderService, UserService } from '@core/services';
import { ContactDetails } from '@core/models/contactDetails';
import { MPPreferencesResponse } from '@core/models/response/mpPreferencesResponse';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
    public cartItems: CartItem[] = [];
    public orderDetails!: OrderDetails;
    public isContactDetailsFormValid = false;
    public contactDetails: ContactDetails = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    };

    public deliveryAddress: string = '';

    public isLoading: boolean = false;

    constructor(
        private _navigationService: NavigationService,
        private _cartService: CartService,
        private _deliveryService: DeliveryService,
        private _messageService: MessageService,
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

        this._deliveryService.getDeliveryMapAddress().subscribe({
            next: (address: string) => {
                this.deliveryAddress = address;
            }
        });
    }

    public onFormValidityChange(validity: boolean): void {
        this.isContactDetailsFormValid = validity;
    }

    public onDeliveryOptionChange(deliveryOption: string): void {
        console.log("selected: ", deliveryOption)
    }

    public goToNextStep(): void {
        this._navigationService.navigateTo('');
    }

    public goToPreviousStep(): void {
        this._navigationService.navigateTo(CHECKOUT_CART);
    }

    public placeOrder(): void {

        if (this.isContactDetailsFormValid) {

            this.isLoading = true;

            this._orderService.registerWebOrder(this.orderDetails, this.contactDetails).subscribe({
                next: (response: MPPreferencesResponse) => {
                    window.location.href = response.sandbox_init_point;
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
}
