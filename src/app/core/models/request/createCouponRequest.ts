export interface CreateCouponRequest {
    code: string;
    discount_type: string;
    amount: string;
    description?: string;
    usage_limit?: number; // always 1 except ML tax
}

export interface CouponLineItem {
    code: string;
}