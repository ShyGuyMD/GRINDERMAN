import { Injectable } from '@angular/core';
import { Book } from '@core/models/book';
import { Product } from '@core/models/product';
import { Attributes, InventoryStatus, Severity } from '@shared/constants';
import { WooCommerceApiService } from '../woo-commerce';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UtilsService } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  genreOptions: any[] = [];
  private bookData$: BehaviorSubject<Book | null> =
    new BehaviorSubject<Book | null>(null);

  constructor(private _wooCommerceAPIService: WooCommerceApiService, private _utilService: UtilsService) {
    this.loadGenreOptionsFromDB();
  }
  
  getBookById(id: number): Observable<Book> {
    return this._wooCommerceAPIService.getProductsById(id).pipe(
      map(response => this.mapProductToBook(response))
    );
  }

  public getBookData(): Observable<Book | null> {
    return this.bookData$.asObservable();
  }

  public setBookData(book: Book): void {
    this.bookData$.next(book);
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
    const extractedImages = this.extractImageURLs(product.images);

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
      cover: this.extractCover(extractedImages),
      images:  extractedImages.length > 0 ? extractedImages : [{ name: 'placeholder', src: 'assets/images/placeholder.png' }],
      inventoryStatus: this.extractStockStatus(product.stock_status),
      synopsis: this._utilService.sanitizeAndRemoveHtmlTags(product.description),

      // Control Fields
      isNew: this.extractMetadataAndEvaluate('isNew', metadata),
      isHardcover: this.extractMetadataAndEvaluate('isHardcover', metadata),
      isActive: this.extractMetadataAndEvaluate('isActive', metadata),
    };
  }

  private extractCover(imagesURLs: any[]): any {
    const cover = imagesURLs.find(element => element.name === 'cover') || imagesURLs[0];
    return (
      cover || { name: 'placeholder', src: 'assets/images/placeholder.png' }
    );
  }

  private extractGenres(attributes: any): any {
    const options = attributes
      .find((attr: any) => attr.name === Attributes.ATTR_GENRE)
      ?.options.map((genre: any) => {
        return { name: genre, value: genre };
      });
    return options || [];
    
  }

  private extractImageURLs(images: any): any[] {
    return images.map((image: any) => ({ name: image.name, src: image.src }));
  }

  private extractMetadata(meta_field: string, metadata: any): string {
    return (
      metadata.find((element: any) => element.key === meta_field)?.value || ''
    );
  }

  private extractMetadataAndEvaluate(
    meta_field: string,
    metadata: any
  ): boolean {
    return metadata.some(
      (element: any) => element.key === meta_field && element.value === 'true'
    );
  }
private extractStockStatus(inventoryStatus?: string): string {
    return inventoryStatus === 'instock' ? InventoryStatus.IN_STOCK
         : InventoryStatus.OUT_OF_STOCK;
}
  private loadGenreOptionsFromDB() {
    this._wooCommerceAPIService
      .getProductAttributes()
      .pipe(
        mergeMap((productAttributesResponse: any) => {
          const genreAttr = productAttributesResponse.find(
            (item: any) => (item.name = Attributes.ATTR_GENRE)
          );
          return this._wooCommerceAPIService.getProductAttributeTerms(
            genreAttr.id
          );
        })
      )
      .subscribe({
        next: (productAttrTermsResponse) => {
          const transformedTerms = productAttrTermsResponse.map(
            ({ id, name, slug }: any) => ({ id, name, slug })
          );

          this.genreOptions = [...transformedTerms];
        },
        error: (e) => {
          console.log('Error in getting Terms: ', e);
        },
      });
  }

  deactivateBook(id: number): Observable<any> {
    const data = { meta_data: [{ key: 'isActive', value: false }] };

    return this._wooCommerceAPIService.putProductData(id, data).pipe(
      catchError((error) => {
        console.error('Error in deactivation', error);
        return of(null); // Return an empty observable on error
      })
    );
  }
}