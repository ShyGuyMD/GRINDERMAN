import { BillingAddress, ShippingAddress } from "../address";
import { Metadata } from "../metadata";
import { OrderLineItem } from "../orderLineItem";

export interface OrderResponse {
     // Order Information
     id : number;
     status : string;
     currency : string;
     date_created : string;
     discout_total: string;
     shipping_total: string;
     total : string;
     line_items : OrderLineItem[];
     needs_payment: boolean;
 
     // Customer Information
     customer_id : number;
     billing : BillingAddress;
     shipping : ShippingAddress;

     // Meta
     meta_data ?: Metadata[];
}

export interface CreateOrderResponse extends OrderResponse {}

export interface RetrieveOrderResponse extends OrderResponse {}