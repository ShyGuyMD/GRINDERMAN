import { OrderLineItemResponse } from "./response/orderLineItemResponse";

export interface OrderReportLine {
    id: number,
    date: Date;
    time: string;
    subtotal: number;
    discount_total: number;
    ml_tax: number;
    total: number;
    status: string;
    customer: string
    items: OrderLineItemResponse[];
}
