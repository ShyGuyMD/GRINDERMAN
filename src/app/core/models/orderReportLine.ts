
export interface OrderReportLine {
    id: number,
    date: Date;
    time: string;
    total: number;
    discount_total: number;
    status: string;
    customer: string
}

export interface OrderReportLineItem extends OrderReportLine{
    item_name: string;
    item_id: number;
    item_quantity: number;
    item_total: number;
}