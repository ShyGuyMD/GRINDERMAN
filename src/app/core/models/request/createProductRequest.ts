import { ApiBodyRequest } from './apiBodyRequest';

export interface CreateProductRequest extends ApiBodyRequest {
    name: string;               // title
    regular_price: number;      // price
    description?: string;       // synopsis
    stock_quantity?: number;    // available units
    manage_stock: boolean;      // has to be true by default
    attributes: any;            // genre and others
    images?: any;               // all images
    meta_data: any;
    status: string;
}