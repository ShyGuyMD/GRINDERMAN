import { Book } from "./book";

export interface CartItem {
    book: Book;
    quantity: number;
    unit_price?: number;
}
