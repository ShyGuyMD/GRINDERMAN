import { Injectable } from '@angular/core';
import { CreateOrderRequest } from '@core/models/request/createOrderRequest';
import { CreateOrderResponse, RetrieveOrderResponse } from '@core/models/response/orderResponse';
import { WooCommerceApiService } from '../woo-commerce';
import { Observable } from 'rxjs';
import { CartService } from '../cart';
import { CartItem } from '@core/models/cartItem';
import { OrderLineItem } from '@core/models/orderLineItem';
import { UserService } from '../user';
import { User } from '@core/models/user';
import { OrderDetails } from '@core/models/orderDetails';
import { ContactDetails } from '@core/models/contactDetails';
import { MercadopagoApiService } from '../mercadopago/mercadopago-api.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(
        private _mercadopagoApiService: MercadopagoApiService,
        private _wooCommerceApiService: WooCommerceApiService) { }

    public mapAdminOrderRequest(orderDetails: OrderDetails): CreateOrderRequest {
        const orderLineItems : OrderLineItem[] = orderDetails.cartItems.map(
            (item: CartItem) => {
                return {
                    product_id : item.book.id || 0, //should never be 0
                    quantity : item.quantity
                };
            }
        )

        return {
            customer_id: orderDetails.user?.userId || 0, // 0 for Guest Customer
            line_items: orderLineItems,
            currency: 'UYU',

            status: 'completed',
            set_paid: true
        };
    }

    



    public createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse> {
        return this._wooCommerceApiService.postOrder(request);
    }

    public retrieveOrder(orderId: number): Observable<RetrieveOrderResponse> {
        return this._wooCommerceApiService.getOrdersById(orderId);
    }

    public retrieveAllOrders(): Observable<RetrieveOrderResponse[]> {
        return this._wooCommerceApiService.getAllOrders();
    }
}
