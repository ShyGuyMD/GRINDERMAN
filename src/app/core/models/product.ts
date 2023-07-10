import { Metadata } from './metadata';
export interface Product {
    id?: number;
    name: string;               // title
    price: number;      // price
    description?: string;        // synopsis
    stock_quantity?: number;     // available units
    stock_status?: string;
    manage_stock: boolean;      // has to be true by default
    //categories: Category[];     // genre
    //images?: Image[];           // all images
    meta_data: Metadata[];      // all other attributes  
    attributes: [];
    status: string;  
}
