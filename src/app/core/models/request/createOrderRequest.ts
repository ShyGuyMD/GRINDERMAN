import { BillingAddress, ShippingAddress } from "../address";
import { Metadata } from "../metadata";
import { OrderLineItem } from "../orderLineItem";

export interface CreateOrderRequest {
    customer_id : number;
    status : string;
    currency : string;
    line_items : OrderLineItem[];
    set_paid : boolean;
}

export interface CreateAdminOrderRequest extends CreateOrderRequest {}

export interface CreateCustomerOrderRequest extends CreateOrderRequest {
    billing : BillingAddress;
    shipping? : ShippingAddress;
}

export interface CreateGuestOrderRequest extends CreateCustomerOrderRequest {
    meta_data : Metadata[]; // first name, last name, email, phone number
}