import { ApiBodyRequest } from './apiBodyRequest';
import { Category } from '../category';
import { Image } from '../image';
import { Metadata } from '../metadata';

export interface CreateProductRequest extends ApiBodyRequest {
    name: string;               // title
    regular_price: number;      // price
    description?: string;        // synopsis
    stock_quantity?: number;     // available units
    manage_stock: boolean;      // has to be true by default
    categories: Category[];     // genre
    images?: Image[];            // all images
    meta_data: Metadata[];      // all other attributes   
}