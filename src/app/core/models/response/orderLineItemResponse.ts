import { OrderLineItem } from "../orderLineItem";

export interface OrderLineItemResponse extends OrderLineItem {
    name: string;
    total: string;
    subtotal: string;
}