import { BillingAddress, ShippingAddress } from "../address";
import { CouponLine } from "../couponLine";
import { Metadata } from "../metadata";
import { OrderLineItemResponse } from "./orderLineItemResponse";

export interface OrderResponse {
     // Order Information
     id : number;
     status : string;
     currency : string;
     date_completed : string;
     date_created : string;
     coupon_lines: CouponLine[];
     total : string;
     line_items : OrderLineItemResponse[];
     needs_payment: boolean;
 
     // Customer Information
     customer_id : number;
     billing : BillingAddress;
     shipping : ShippingAddress;

     // Meta
     meta_data ?: Metadata[];
}

export interface CreateOrderResponse extends OrderResponse {}
export interface UpdateOrderResponse extends OrderResponse {}
export interface RetrieveOrderResponse extends OrderResponse {}
