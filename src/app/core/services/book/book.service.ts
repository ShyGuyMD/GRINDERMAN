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
        return {
            id: product.id,
            isbn: this.extractIsbn(product) || '',
            title: product.name || '',
            author: this.extractAuthor(product),
            genre: this.extractGenre(product),
            publisher: this.determinePublisher(product),
            price: product.price || 0,
            inventoryStatus: product.stock_status || '',
            synopsis: product.description || '',
            availableUnits: product.stock_quantity,
            cover: this.determineCoverImage(product),
            images: this.extractImageURLs(product),
            isNew: this.isNew(product),
            isHardcover: this.isHadcover(product),
            isActive: product.status === 'publish',
        };
    }

    private isHadcover(product: Product): boolean {
        return product.meta_data.some(
            (meta: any) => meta.key === 'isHardcover' && meta.value === 'true'
        );
    }

    private isNew(product: Product): boolean {
        return product.meta_data.some(
            (meta: any) => meta.key === 'isNew' && meta.value === 'true'
        );
    }

    private extractIsbn(product: Product): string {
        return (
            product.meta_data.find((meta: any) => meta.key === 'isbn')?.value || ''
        );
    }

    private extractAuthor(product: Product): string {
        return (
            product.meta_data.find((meta: any) => meta.key === 'author')?.value || ''
        );
    }

    private extractGenre(product: Product): any {
        return product.attributes.map((attr: any) => attr.name);
    }

    private determinePublisher(product: any): string {
        return (
            product.meta_data.find((meta: any) => meta.key === 'publisher')?.value ||
            ''
        );
    }

    private determineCoverImage(product: any): string {
        return product.images.length > 0
            ? product.images[0].src
            : 'assets/images/placeholder.png';
    }

    private extractImageURLs(product: any): string[] {
        return product.images.map((image: any) => image.src);
    }
}
