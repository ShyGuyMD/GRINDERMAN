import { Injectable } from '@angular/core';
import { Book } from '@core/models/book';
import { Product } from '@core/models/product';
import { InventoryStatus } from '@shared/constants';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    constructor() { }

    public getSeverity(book: Book): string {
        if (book.inventoryStatus === InventoryStatus.OUT_OF_STOCK) {
            return 'danger';
        } else if (book.inventoryStatus === InventoryStatus.LIMITED_STOCK) {
            return 'warn';
        } else {
            return 'success';
        }
    }

    public mapProductToBook(product: Product): Book {
        const metadata = product.meta_data;
        const attributes = product.attributes;
        const images = product.images;

        return {
            id: product.id,

            // Mandatory Fields
            author: this.extractMetadata('author', metadata),
            genre: this.extractGenres(attributes),
            isbn: this.extractMetadata('isbn', metadata),
            price: product.regular_price,
            publisher: this.extractMetadata('publisher', metadata),
            title: product.name,

            // Optional Fields
            availableUnits: product.stock_quantity,
            cover: this.extractCover(images),
            images: this.extractImageURLs(images),
            inventoryStatus: product.stock_status,
            synopsis: product.description,

            // Control Fields
            isNew: this.extractMetadataAndEvaluate('isNew', metadata),
            isHardcover: this.extractMetadataAndEvaluate('isHardcover', metadata),
            isActive: this.extractMetadataAndEvaluate('isActive', metadata),
        };
    }

    private extractCover(images: any): any {
        const cover = this.extractImageURLs(images).find((element) => element.name === 'cover');
        return cover || { 'name' : 'placeholder', 'src' : 'assets/images/placeholder.png' };
    }

    private extractGenres(attributes: any): any {
        const options = attributes.find((attr: any) => attr.name === 'Genero')?.options;
        return options.toString().replace(/,/g, ', ') || [];
    }

    private extractImageURLs(images: any): any[] {
        return images.map((image: any) => { image.name, image.src });
    }

    private extractMetadata(meta_field: string, metadata: any): string {
        return metadata.find(
            (element: any) => element.key === meta_field
        )?.value || '';
    }

    private extractMetadataAndEvaluate(meta_field: string, metadata: any): boolean {
        return metadata.some(
            (element: any) => element.key === meta_field && element.value === 'true'
        );
    }
}
