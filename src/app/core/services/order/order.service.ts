import { Injectable } from '@angular/core';
import { CreateOrderRequest } from '@core/models/request/createOrderRequest';
import { CreateOrderResponse, UpdateOrderResponse, RetrieveOrderResponse } from '@core/models/response/orderResponse';
import { WooCommerceApiService } from '../woo-commerce';
import { Observable, map, mergeMap } from 'rxjs';
import { CartItem } from '@core/models/cartItem';
import { OrderLineItem } from '@core/models/orderLineItem';
import { OrderDetails } from '@core/models/orderDetails';
import { OrderReportLine } from '@core/models/orderReportLine';
import { Option } from '@core/models/option';
import { ComisionMercadoLibre, CouponType, MercadoPagoCallbackURLs, OrderMetadataKeys, OrderType, Order_Properties } from '@shared/constants';
import { Coupon } from '@core/models/coupon';
import { CreateCouponRequest } from '@core/models/request/createCouponRequest';
import { CreateCouponResponse } from '@core/models/response/couponResponse';
import { UtilsService } from '../utils';
import { CartService } from '../cart';
import { ContactDetails } from '@core/models/contactDetails';
import { MPPreferencesRequest, MercadoPagoCallbacks, MercadoPagoItem, MercadoPagoPayerInfo } from '@core/models/request/mpPreferencesRequest';
import { MercadopagoService } from '../mercadopago/mercadopago.service';
import { MPPreferencesResponse } from '@core/models/response/mpPreferencesResponse';
import { Metadata } from '@core/models/metadata';
import { OrderLineItemResponse } from '@core/models/response/orderLineItemResponse';

@Injectable({
    providedIn: 'root',
})
export class OrderService {

    constructor(
        private _cartService: CartService,
        private _utilsService: UtilsService,
        private _mercadoPagoApiService: MercadopagoService,
        private _wooCommerceApiService: WooCommerceApiService
    ) { }

    
    public registerWebOrder(orderDetails: OrderDetails, contactDetails: ContactDetails, deliveryAddress: string = ''): Observable<MPPreferencesResponse> {
        const orderRequest = this.buildWebOrderRequest(orderDetails, contactDetails, deliveryAddress);

        return this.createOrder(orderRequest).pipe(
            mergeMap((response : CreateOrderResponse) => {
                const preferenceRequest = this.createMercadoPagoPreference(response, contactDetails);

                return this._mercadoPagoApiService.checkout(preferenceRequest).pipe(
                    map((checkoutResponse: MPPreferencesResponse) => {
                        return checkoutResponse;
                    })
                )
            })
        )
    }

    public registerManualOrder(orderDetails: OrderDetails, coupon: Coupon | null = null, mercadoLibre: boolean = false): Observable<CreateOrderResponse> {
        
        return coupon
            ? this.registerManualOrderWithDiscount(orderDetails, coupon)
            : this.registerManualOrderNoDiscount(orderDetails, mercadoLibre);
    }

    private registerManualOrderWithDiscount(orderDetails: OrderDetails, coupon: Coupon): Observable<CreateOrderResponse> {

        const couponRequest = coupon.type === CouponType.CREDIT
                            ? this.buildCouponRequest(coupon)
                            : this.buildCouponRequest(coupon, this._cartService.getTotalAmount() - this._cartService.getTotalAmountWithCoupons());

        return this._wooCommerceApiService.postCoupon(couponRequest).pipe(
            mergeMap((response: CreateCouponResponse) => {
                const orderRequest = this.buildAdminOrderRequest(orderDetails, false, response.code);

                return this.createOrder(orderRequest).pipe(
                    map((orderResponse: CreateOrderResponse) => {
                        return orderResponse;
                    })
                )
            })
        )
    }

    private registerManualOrderNoDiscount(orderDetails: OrderDetails, isMercadoLibre: boolean): Observable<CreateOrderResponse> {
        const orderRequest = this.buildAdminOrderRequest(orderDetails, isMercadoLibre);

        return this.createOrder(orderRequest);
    }

    private buildCouponRequest(coupon: Coupon, overrideValue: number = -1): CreateCouponRequest {
        const couponCode = this._utilsService.generateRandomAlphanumericString(8);
        return {
            code: couponCode, 
            discount_type: CouponType.CREDIT,
            amount: (overrideValue > 0 ? overrideValue : coupon.value).toString(),
            usage_limit: 1
        }
    }

    private buildAdminOrderRequest(orderDetails: OrderDetails, isMercadoLibre: boolean = false, discountCode: string | null = null): CreateOrderRequest {

        const request: CreateOrderRequest = {
            customer_id: orderDetails.user?.userId || 0, // should never be 0
            line_items: [],
            currency: 'UYU',
            status: 'completed',
            set_paid: true,
            coupon_lines: discountCode ? [{code: discountCode}] : [],
            meta_data: []
        }

        const orderLineItems: OrderLineItem[] = orderDetails.cartItems.map(
            (item: CartItem) => {
                return {
                    product_id: item.book.id || 0,
                    quantity: item.quantity
                };
            }
        )

        request.line_items = orderLineItems;
        request.coupon_lines = discountCode ? [{code: discountCode}] : [];

        if (isMercadoLibre) {
            request.meta_data?.push({ key: OrderMetadataKeys.ORDER_META_ML_TAX, value: ComisionMercadoLibre.toString() });
            request.meta_data?.push({ key: OrderMetadataKeys.ORDER_META_ORDER_TYPE, value: OrderType.ORDER_TYPE_ADMIN_ML })
        } else {
            request.meta_data?.push({ key: OrderMetadataKeys.ORDER_META_ORDER_TYPE, value: OrderType.ORDER_TYPE_ADMIN_STORE });
        }

        return request;
    }

    private buildWebOrderRequest(orderDetails : OrderDetails, contactDetails: ContactDetails, deliveryAddress: string) : CreateOrderRequest {

        const orderLineItems: OrderLineItem[] = orderDetails.cartItems.map(
            (item: CartItem) => {
                return {
                    product_id: item.book.id || 0,
                    quantity: item.quantity
                };
            }
        )

        const request : CreateOrderRequest = {
            customer_id: orderDetails.user?.userId || 0, // should never be 0
            line_items: orderLineItems,
            currency: 'UYU',
            set_paid: false,
            meta_data: []
        }

        request.meta_data?.push( { key: OrderMetadataKeys.ORDER_META_CUSTOMER_FIRST_NAME, value: contactDetails.firstName });
        request.meta_data?.push( { key: OrderMetadataKeys.ORDER_META_CUSTOMER_LAST_NAME, value: contactDetails.lastName });
        request.meta_data?.push( { key: OrderMetadataKeys.ORDER_META_CUSTOMER_EMAIL, value: contactDetails.email });
        request.meta_data?.push( { key: OrderMetadataKeys.ORDER_META_CUSTOMER_PHONE, value: contactDetails.phone });

        request.meta_data?.push( { key: OrderMetadataKeys.ORDER_META_ORDER_TYPE, value: orderDetails.user ? OrderType.ORDER_TYPE_CUSTOMER : OrderType.ORDER_TYPE_GUEST });
        
        if (deliveryAddress) request.meta_data?.push( { key: OrderMetadataKeys.ORDER_META_CUSTOMER_DELIVERY, value: deliveryAddress });

        console.log('Web Order Request: ', request);

        return request;
    }

    private createMercadoPagoPreference(data: CreateOrderResponse, contactDetails: ContactDetails) : MPPreferencesRequest {

        const mpItems : MercadoPagoItem[] = data.line_items.map((item : OrderLineItemResponse) => {
            return {
                id: item.product_id.toString(),
                title: item.name || '',
                quantity: item.quantity,
                unit_price: item.price || 0
            }
        });

        const payerInfo : MercadoPagoPayerInfo = {
            name: contactDetails.firstName,
            surname: contactDetails.lastName,
            email: contactDetails.email
        }

        const callbackURLs : MercadoPagoCallbacks = {
            success: MercadoPagoCallbackURLs.MERCADOPAGO_PAYMENT_SUCCESS,
            pending: MercadoPagoCallbackURLs.MERCADOPAGO_PAYMENT_PENDING,
            failure: MercadoPagoCallbackURLs.MERCADOPAGO_PAYMENT_FAILURE
        };

        //build the request
        const preferencesRequest : MPPreferencesRequest = {
            items: mpItems,
            payer: payerInfo,
            back_urls: callbackURLs,
            auto_return: 'approved',
            external_reference: data.id.toString()
        };

        return preferencesRequest;
    }

    public mapOrderReportLine(orderResponse: RetrieveOrderResponse[]): OrderReportLine[] {
        const orderReportLines: OrderReportLine[] = [];

        orderResponse.forEach((order: RetrieveOrderResponse) => {
            const [datePart, timePart] = order.date_created.split('T');
            const  ml_tax : Metadata | undefined = order.meta_data?.find( x => x.key = 'ml_tax');
            const orderReportLine: OrderReportLine = {
                id: order.id,
                date: new Date(datePart),
                time: timePart.slice(0, 5),
                subtotal: order.line_items.reduce((acc, item) => acc + parseFloat(item.subtotal), 0),
                total: parseFloat(order.total),
                discount_total: order.coupon_lines.length > 0 ? parseFloat(order.coupon_lines[0].discount) : 0,
                ml_tax:  ml_tax ? parseFloat(ml_tax.value) / 100 * parseFloat(order.total) : 0,
                status: order.status,
                customer: order.customer_id.toString(),
                items: order.line_items
            };
            orderReportLines.push(orderReportLine);
        });
        return orderReportLines;
    }

    public getOrderProperties(): Option[] {
        return [
            { value: 'ID', key: Order_Properties.ID },
            { value: 'Fecha', key: Order_Properties.DATE },
            { value: 'Hora', key: Order_Properties.TIME },
            { value: 'Cliente', key: Order_Properties.CUSTOMER },
            { value: 'Items', key: Order_Properties.ITEMS },
            { value: 'Subtotal', key: Order_Properties.SUBTOTAL },
            { value: 'Descuento', key: Order_Properties.DISCOUNT_TOTAL },
            { value: 'Comisión', key: Order_Properties.ML_TAX },
            { value: 'Total', key: Order_Properties.TOTAL },
        ];
    
    }

    // - WooCommerce API Calls.

    public createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse> {
        console.log('Create Order Request: ', request);
        return this._wooCommerceApiService.postOrder(request);
    }

    public updateOrder(orderId: number, body: any): Observable<UpdateOrderResponse> {
        console.log('Update Order Request: ', orderId, body);
        return this._wooCommerceApiService.putOrder(orderId, body);
    }

    public retrieveOrder(orderId: number): Observable<RetrieveOrderResponse> {
        return this._wooCommerceApiService.getOrdersById(orderId);
    }

    public retrieveAllOrders(): Observable<RetrieveOrderResponse[]> {
        return this._wooCommerceApiService.getAllOrders();
    }
}
