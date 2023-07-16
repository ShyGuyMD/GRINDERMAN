export interface Book {
    isbn: string;
    title: string;
    author: string;
    genre?: any;
    publisher: string;
    price: number;

    inventoryStatus?: string;  // good to have
    id?: number;
    synopsis?: string;
    availableUnits?: number;
    cover?: any;
    images?: any;

    isNew: boolean;
    isHardcover: boolean;
    isActive: boolean;
}