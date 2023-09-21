import { BillingAddress, ShippingAddress } from "../address";
import { Metadata } from "../metadata";
import { OrderLineItem } from "../orderLineItem";
import { CouponLineItem } from "./createCouponRequest";

export interface CreateOrderRequest {
    customer_id : number;
    status? : string;
    currency : string;
    line_items : OrderLineItem[];
    set_paid : boolean;
    coupon_lines?: CouponLineItem[];
    meta_data?: Metadata[]
}