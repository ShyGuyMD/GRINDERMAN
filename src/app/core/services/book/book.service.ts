import { Injectable } from '@angular/core';
import { Book } from '@core/models/book';
import { Product } from '@core/models/product';
import { Attributes, Book_Properies, InventoryStatus, Severity } from '@shared/constants';
import { WooCommerceApiService } from '../woo-commerce';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, forkJoin, interval, of } from 'rxjs';
import { UtilsService } from '../utils';
import { Option } from '@core/models/option';

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

  public getAllBooks(): Observable<Book[]> {
    return this._wooCommerceAPIService.getAllProducts().pipe(
      map((response: any[]) => {
        return response.map((product: any) => this.mapProductToBook(product));
      })
    );
  }

  public getBooks(keyword:string = '', page: number): Observable<Book[]> {

    if(keyword !== '' ) return this.getFilteredBooks(keyword, page);

    return this._wooCommerceAPIService.getProducts(page).pipe(
      map((response: any[]) => {
        return response.map((product: any) => this.mapProductToBook(product));
      })
    );
  }

  public getFilteredBooks( keyword:string, page: number = 1): Observable<Book[]> {
    return this._wooCommerceAPIService.getProductsByKeyword(keyword, page).pipe(
      map((response: any[]) => {
        return response.map((product: any) => this.mapProductToBook(product));
      })
    );
  }

  public createBook(input: any): Book {
    const newBook: Book = {
      author: input.author,
      availableUnits: input.availableUnits,
      isActive: input.isActive,
      isbn: input.isbn,
      isHardcover: input.isHardcover, 
      price: input.price,
      isNew: input.isNew,
      publisher: input.publisher,
      title: input.title,
      cover: input.cover,
      genre: input.genre,
      id: input.id,
      images: input.images,
      inventoryStatus: input.inventoryStatus,
      synopsis: input.synopsis
    }
    return newBook
  }

  public postBook(book: Book): void {
    this._wooCommerceAPIService.postProduct(book).subscribe({
      next: (v) => {
          console.log('submitting: ', book);
          console.log('response: ', v);
      },
      error: (e) => {
          console.log('error: ', e);
      }})
  }

  public postBooksInBatches(books: Book[], batchSize: number, delay: number): Observable<any> {
    const totalBatches = Math.ceil(books.length / batchSize);
  
    return interval(delay).pipe(
      take(totalBatches),
      mergeMap(batchIndex => {
        const startIndex = batchIndex * batchSize;
        const endIndex = Math.min(startIndex + batchSize, books.length);
        const batch = books.slice(startIndex, endIndex);
        return this.postBatchOfBooks(batch);
      })
    );
  }

  public postBatchOfBooks(books: Book[]): Observable<any> {
    const requests$ = books.map(book => this._wooCommerceAPIService.postProduct(book).pipe(catchError(error => of({ success: false, error }))));

    return forkJoin(requests$);
  }

  public getGenreOptions(): any {
    return this.genreOptions;
  }

  public getBookPropertyOptions(): Option[]{
    return [
      { value: 'ID', key: Book_Properies.ID },
      { value: 'ISBN', key: Book_Properies.ISBN },
      { value: 'Título', key: Book_Properies.TITLE },
      { value: 'Autor', key: Book_Properies.AUTHOR },
      { value: 'Género', key: Book_Properies.GENRE },
      { value: 'Editorial', key: Book_Properies.PUBLISHER },
      { value: 'Precio', key: Book_Properies.PRICE },
      { value: 'Sinopsis', key: Book_Properies.SYNOPSIS },
      { value: 'Unidades disponibles', key: Book_Properies.AVAILABLE_UNITS },
      { value: 'Disponibilidad', key: Book_Properies.INVENTORY_STATUS },
      { value: 'Portada', key: Book_Properies.COVER },
      { value: 'Imagenes', key: Book_Properies.IMAGES },
      { value: 'Estado', key: Book_Properies.IS_NEW },
      { value: 'Tapa', key: Book_Properies.IS_HARDCOVER },
      { value: 'Activo', key: Book_Properies.IS_ACTIVE },
    ]
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
      price: Number(product.regular_price),
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