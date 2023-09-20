import { Injectable } from '@angular/core';
import { CreateOrderRequest } from '@core/models/request/createOrderRequest';
import { CreateOrderResponse, RetrieveOrderResponse } from '@core/models/response/orderResponse';
import { WooCommerceApiService } from '../woo-commerce';
import { Observable, map, mergeMap } from 'rxjs';
import { CartItem } from '@core/models/cartItem';
import { OrderLineItem } from '@core/models/orderLineItem';
import { OrderDetails } from '@core/models/orderDetails';
import { OrderReportLineItem } from '@core/models/orderReportLine';
import { Option } from '@core/models/option';
import { ComisionMercadoLibre, CouponType, Order_Properties } from '@shared/constants';
import { Coupon } from '@core/models/coupon';
import { CreateCouponRequest } from '@core/models/request/createCouponRequest';
import { CreateCouponResponse } from '@core/models/response/couponResponse';
import { UtilsService } from '../utils';
import { CartService } from '../cart';

@Injectable({
    providedIn: 'root',
})
export class OrderService {

    constructor(
        private _cartService: CartService,
        private _utilsService: UtilsService,
        private _wooCommerceApiService: WooCommerceApiService
    ) { }


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

        return this._wooCommerceApiService.postOrder(orderRequest);
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
            coupon_lines: discountCode ? [{code: discountCode}] : []
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
        request.meta_data = isMercadoLibre ? [{ key: "ml_tax",
                                                value: ComisionMercadoLibre.toString() }] : [];

        return request;
    }

    public createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse> {
        console.log('Create Order Request: ', request);
        return this._wooCommerceApiService.postOrder(request);
    }

    public retrieveOrder(orderId: number): Observable<RetrieveOrderResponse> {
        return this._wooCommerceApiService.getOrdersById(orderId);
    }

    public retrieveAllOrders(): Observable<RetrieveOrderResponse[]> {
        return this._wooCommerceApiService.getAllOrders();
    }

    public mapOrderReportLine(orderResponse: RetrieveOrderResponse[]): OrderReportLineItem[] {
        const orderReportLineItems: OrderReportLineItem[] = [];

        orderResponse.forEach((order: RetrieveOrderResponse) => {
            order.line_items.forEach((item) => {
                const [datePart, timePart] = order.date_created.split('T');

                const orderReportLineItem: OrderReportLineItem = {
                    id: order.id,
                    date: new Date(datePart),
                    time: timePart.slice(0, 5),
                    total: parseFloat(order.total),
                    discount_total: parseFloat(order.discout_total),
                    status: order.status,
                    customer: order.customer_id.toString(),
                    item_name: item.name!,
                    item_id: item.product_id,
                    item_quantity: item.quantity,
                    item_total: item.total!
                };

                orderReportLineItems.push(orderReportLineItem);
            });
        });

        return orderReportLineItems;
    }

    public getOrderProperties(): Option[] {
        return [
            { value: 'ID', key: Order_Properties.ID },
            { value: 'Fecha', key: Order_Properties.DATE },
            { value: 'Hora', key: Order_Properties.TIME },
            { value: 'Cliente', key: Order_Properties.CUSTOMER },
            { value: 'Item', key: Order_Properties.ITEM_NAME },
            { value: 'Cantidad', key: Order_Properties.ITEM_QUANTITY },
            { value: 'Subtotal', key: Order_Properties.ITEM_TOTAL },
            { value: 'Descuento', key: Order_Properties.DISCOUNT_TOTAL },
            { value: 'Total', key: Order_Properties.TOTAL },
            { value: 'Status', key: Order_Properties.STATUS },
        ];
    }
}
