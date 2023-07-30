import { Injectable } from '@angular/core';
import { Book } from '@core/models/book';
import { Product } from '@core/models/product';
import { Attributes, InventoryStatus, Severity } from '@shared/constants';
import { WooCommerceApiService } from '../woo-commerce';
import { mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    genreOptions: any[] = [];

    constructor(
        private _wooCommerceAPIService: WooCommerceApiService
    ) {
        this.loadGenreOptionsFromDB();
    }

    public getInventorySeverity(book: Book): string {
        if (book.inventoryStatus === InventoryStatus.OUT_OF_STOCK) {
            return Severity.DANGER;
        } else if (book.inventoryStatus === InventoryStatus.LIMITED_STOCK) {
            return Severity.WARNING;
        } else {
            return Severity.SUCCESS;
        }
    }

    public getGenreOptions(): any {
        return this.genreOptions;
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
        const options = attributes
                            .find((attr: any) => attr.name === 'Genero')?.options
                            .map((genre : any) => { return { 'name' : genre, 'value' : genre } });
        return options || [];
    }

    private extractImageURLs(images: any): any[] {
        return images.map((image: any) => ({ name: image.name, src: image.src }));
    }

    private extractMetadata(meta_field: string, metadata: any): string {
        return metadata
                .find((element: any) => element.key === meta_field)?.value || '';
    }

    private extractMetadataAndEvaluate(meta_field: string, metadata: any): boolean {
        return metadata
                .some((element: any) => element.key === meta_field && element.value === 'true');
    }

    private loadGenreOptionsFromDB() {
        this._wooCommerceAPIService
            .getProductAttributes()
            .pipe(
                mergeMap((productAttributesResponse: any) => {
                    const genreAttr = productAttributesResponse
                                        .find((item: any) => item.name = Attributes.ATTR_GENRE);
                    return this._wooCommerceAPIService.getProductAttributeTerms(genreAttr.id);
                })
        ).subscribe({
            next: (productAttrTermsResponse) => {
                const transformedTerms = productAttrTermsResponse.map(
                    ({ id, name, slug }: any) => ({ id, name, slug })
                );

                this.genreOptions = [...transformedTerms];
            },
            error: (e) => {
                console.log('Error in getting Terms: ', e);
            }
        });
    }
}