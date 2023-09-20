export interface CouponResponse {
    id: number;
    code: string;
    amount: string;
    discount_type: string;
    description?: string;
    usage_limit: number;
}

export interface CreateCouponResponse extends CouponResponse {}

export interface RetrieveCouponResponse extends CouponResponse {}