import { Component } from '@angular/core';
import { NavigationService } from '@core/services';
import { BLANK_PAGE, CHECKOUT_CART } from '@shared/constants';
import { CartItem } from '@core/models/cartItem';
import { OrderDetails } from '@core/models/orderDetails';
import { CreateOrderResponse } from '@core/models/response/orderResponse';
import { CartService, OrderService, UserService } from '@core/services';
import { ContactDetails } from '@core/models/contactDetails';
import { mergeMap } from 'rxjs';

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
        name: '',
        lastname: '',
        email: '',
        phone: '',
    };

    constructor(
        private _navigationService: NavigationService,
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
/*
    public placeCustomerorder(): void {
        if (this.isContactDetailsFormValid) {
            const request = this._orderService.mapCustomerOrderRequest(this.orderDetails, this.contactDetails);
            console.log("customer request: ", request);

            this._orderService.createOrder(request).pipe(
                mergeMap((createOrderResponse: CreateOrderResponse) => {
                    const preference = this._orderService.mapMercadoPagoPreferenceRequest(createOrderResponse);
                    return this.
                })
            )
        }
    }*/

    /*
    private loadGenreOptionsFromDB() {
        this._wooCommerceAPIService.getProductAttributes().pipe(
            mergeMap((productAttributesResponse: any) => {
                const genreAttr = productAttributesResponse.find(
                    (item: any) => (item.name = Attributes.ATTR_GENRE)
                );
                return this._wooCommerceAPIService.getAllProductAttributeTerms(genreAttr.id);
        }))
        .subscribe({
            next: (productAttrTermsResponse) => {
                const transformedTerms = productAttrTermsResponse.map(({ id, name, slug }: any) => ({ id, name, slug }));
                this.setGenreOptions(transformedTerms);
            },
            error: (e) => {
                console.log('Error in getting Terms: ', e);
            },
        });
    }
  */

    public placeOrder(): void {
        if (this.isContactDetailsFormValid) {
            //this._orderService.
            const request = this._orderService.mapAdminOrderRequest(this.orderDetails);
            this._orderService.createOrder(request).pipe(
                /*mergeMap((response) => {
                    // mercadopago stuff
                    const aux = response;
                    return {}
                })*/
            )
            .subscribe({
                next: (mpResponse) => {
                    // handle MercadoPago response
                },
                error: (e) => {
                    // handle error
                }
            })
        } else {
            this._navigationService.navigateTo(BLANK_PAGE, 'Error Creating Order');
        }
    }
}
