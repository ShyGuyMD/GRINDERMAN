export interface OrderLineItem {
    product_id : number;
    quantity : number;
    name?: string;
    total?: number;
    subtotal?: number;
}