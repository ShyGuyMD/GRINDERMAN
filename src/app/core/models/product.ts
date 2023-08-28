export interface Product {
    id?: number;

    // Common Fields
    name: string;               // Title
    description: string;        // Synopsis
    regular_price: string;              // Price
    stock_quantity: number;     // Available units
    stock_status: string;       

    images: any;                // Cover image + All other images.
    meta_data: any;             // ISBN, Author, Publisher, isNew, isHardcover, isActive
    attributes: any;            // Genre(s)

    // Defaulted Fields
    manage_stock: boolean;      // has to be "true" by default
    status: string;             // has to be "publish" by default
}
