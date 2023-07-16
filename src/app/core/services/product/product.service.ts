import { Injectable } from '@angular/core';
import { Book } from '@core/models/book';
import { Product } from '@core/models/product';
import { InventoryStatus } from '@shared/constants';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor() { }

    public mapBookToProduct(book: Book): Product {
        const bookImages = [];
        if (book.cover) bookImages.push(book.cover);
        if (book.images) bookImages.push(...book.images);

        return {
            id: book.id,

            name: book.title,
            description: book.synopsis || '',
            regular_price: book.price,
            stock_quantity: book.availableUnits || 0,
            stock_status: this.injectStockStatus(book.inventoryStatus),

            images: bookImages.length ? this.injectImages(bookImages) : [],
            meta_data: this.buildMetadata(book),
            attributes: this.injectGenreOptions(book.genre),

            manage_stock: true,
            status: 'publish',
        }
    }

    private buildMetadata(book: Book): any {
        return [
            { 'key' : 'author', 'value' : book.author }
            ,{ 'key' : 'isbn', 'value' : book.isbn }
            ,{ 'key' : 'publisher', 'value' : book.publisher }
            ,{ 'key' : 'isActive', 'value' : book.isActive ? 'true' : 'false' }
            ,{ 'key' : 'isHardcover', 'value' : book.isHardcover ? 'true' : 'false' }
            ,{ 'key' : 'isNew', 'value' : book.isNew ? 'true' : 'false' }
        ]
    }

    private injectGenreOptions(genreOptions?: any): any {
        return [{
            'name': 'Genero',
            'options': genreOptions.map((element: any) => element.name)
        }];
    }

    private injectImages(bookImages: any): any {
        return bookImages.map((image: any) => { image.name, image.src });
    }

    private injectStockStatus(inventoryStatus?: string): string {
        return inventoryStatus && inventoryStatus === InventoryStatus.IN_STOCK
            ? 'instock'
            : 'outofstock';
    }
}
