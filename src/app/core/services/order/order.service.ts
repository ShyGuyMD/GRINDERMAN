import { Injectable } from '@angular/core';
import { CreateOrderRequest } from '@core/models/request/createOrderRequest';
import {
  CreateOrderResponse,
  RetrieveOrderResponse,
} from '@core/models/response/orderResponse';
import { WooCommerceApiService } from '../woo-commerce';
import { Observable } from 'rxjs';
import { CartItem } from '@core/models/cartItem';
import { OrderLineItem } from '@core/models/orderLineItem';
import { OrderDetails } from '@core/models/orderDetails';
import { OrderReportLineItem } from '@core/models/orderReportLine';
import { Option } from '@core/models/option';
import { Order_Properies } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _wooCommerceApiService: WooCommerceApiService) {}

  public mapOrderRequest(orderDetails: OrderDetails): CreateOrderRequest {
    const orderLineItems: OrderLineItem[] = orderDetails.cartItems.map(
      (item: CartItem) => {
        return {
          product_id: item.book.id || 0, //should never be 0
          quantity: item.quantity,
        };
      }
    );

    return {
      customer_id: orderDetails.user?.userId || 0, // 0 for Guest Customer
      line_items: orderLineItems,
      currency: 'UYU',

      status: 'completed', // TODO: handle after payment portals
      set_paid: true, // TODO: handle after payment portals
    };
  }

  public createOrder(
    request: CreateOrderRequest
  ): Observable<CreateOrderResponse> {
    return this._wooCommerceApiService.postOrder(request);
  }

  public retrieveOrder(orderId: number): Observable<RetrieveOrderResponse> {
    return this._wooCommerceApiService.getOrdersById(orderId);
  }

  public retrieveAllOrders(): Observable<RetrieveOrderResponse[]> {
    return this._wooCommerceApiService.getAllOrders();
  }

  public mapOrderReportLine(
    orderResponse: RetrieveOrderResponse[]
  ): OrderReportLineItem[] {
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
      { value: 'ID', key: Order_Properies.ID },
      { value: 'Fecha', key: Order_Properies.DATE },
      { value: 'Hora', key: Order_Properies.TIME },
      { value: 'Cliente', key: Order_Properies.CUSTOMER },
      { value: 'Item', key: Order_Properies.ITEM_NAME },
      { value: 'Cantidad', key: Order_Properies.ITEM_QUANTITY },
      { value: 'Subtotal', key: Order_Properies.ITEM_TOTAL },
      { value: 'Descuento', key: Order_Properies.DISCOUNT_TOTAL },
      { value: 'Total', key: Order_Properies.TOTAL },
      { value: 'Status', key: Order_Properies.STATUS },
    ];
  }
}
