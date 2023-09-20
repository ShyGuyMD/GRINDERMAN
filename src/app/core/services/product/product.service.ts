import { Injectable } from '@angular/core';
import { Book } from '@core/models/book';
import { Genre } from '@core/models/genre';
import { Product } from '@core/models/product';
import { InventoryStatus } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  public mapBookToProduct(book: Book): Product {

    return {
      id: book.id,

      name: book.title,
      description: book.synopsis || '',
      regular_price: book.price.toString(),
      stock_quantity: book.availableUnits || 0,
      stock_status: this.injectStockStatus(book.inventoryStatus),

      images: book.images.length > 0 ? book.images : [],
      meta_data: this.buildMetadata(book),
      attributes: book.genre
        ? this.injectGenreOptions(book.genre)
        : this.injectGenreOptions([]),

      manage_stock: true,
      status: 'publish',
    };
  }

  public mapPartialBookToProduct(book: Partial<Book>): Partial<Product> {
    const product: Partial<Product> = {};

    if (book.id !== undefined) {
        product.id = book.id;
    }

    if (book.title !== undefined) {
        product.name = book.title;
    }

    if (book.synopsis !== undefined) {
        product.description = book.synopsis;
    } else {
        product.description = '';
    }

    if (book.price !== undefined) {
        product.regular_price = book.price.toString();
    }

    if (book.availableUnits !== undefined) {
        product.stock_quantity = book.availableUnits;
    } else {
        product.stock_quantity = 0;
    }

    if (book.inventoryStatus !== undefined) {
        product.stock_status = this.injectStockStatus(book.inventoryStatus);
    }

    if (book.images !== undefined) {
        product.images = book.images.length > 0 ? book.images : [];
    }

    if (book.genre !== undefined) {
        product.attributes = this.injectGenreOptions(book.genre);
    } else {
        product.attributes = this.injectGenreOptions([]);
    }

    const metadata = this.buildPartialMetadata(book);

    if(metadata.length > 0){
      product.meta_data = metadata;
    }

    return product;
}

  private buildPartialMetadata(book: Partial<Book>): any[]{
    const metadata: any[] = []

    if(book.author){
      metadata.push({ key: 'author', value: book.author ? book.author : '' });
    }
    if(book.isbn){
      metadata.push({ key: 'isbn', value: book.isbn ? book.isbn : '' });
    }
    if(book.publisher){
      metadata.push({ key: 'publisher', value: book.publisher ? book.publisher : '' });
    }
    if(book.isActive){
      metadata.push({ key: 'isActive', value: book.isActive ? 'true' : 'false' });
    }
    if(book.isHardcover){
      metadata.push( { key: 'isHardcover', value: book.isHardcover ? 'true' : 'false' });
    }
    if(book.isNew){
      metadata.push( { key: 'isNew', value: book.isNew ? 'true' : 'false' });
    }

    return metadata;
  }

  private buildMetadata(book: Book): any {
    return [
      { key: 'author', value: book.author ? book.author : '' },
      { key: 'isbn', value: book.isbn ? book.isbn : '' },
      { key: 'publisher', value: book.publisher ? book.publisher : '' },
      { key: 'isActive', value: book.isActive ? 'true' : 'false' },
      { key: 'isHardcover', value: book.isHardcover ? 'true' : 'false' },
      { key: 'isNew', value: book.isNew ? 'true' : 'false' },
    ];
  }

  private injectGenreOptions(genreOptions: Genre[] | string): any {
    if (Array.isArray(genreOptions)) {
      return [
        {
          name: 'Genero',
          options: genreOptions.length > 0 ? genreOptions.map((element: Genre) => element.name) : [],
        },
      ];
    } else if (typeof genreOptions === 'string') {
      const optionsArray = genreOptions
        .split(',')
        .map((option) => option.trim());
      return [
        {
          name: 'Genero',
          options: optionsArray,
        },
      ];
    } else {
      [
        {
          name: 'Genero',
          options: [],
        },
      ];
    }
  }

  private injectImages(bookImages: any): any {
    //const imagenes = bookImages.map((image: any) => { return {'name' : image.name, 'src' : image.src } });
    //console.log('imagenes:',  imagenes);
    return [];
  }

  private injectStockStatus(inventoryStatus?: string): string {
    return inventoryStatus && inventoryStatus === InventoryStatus.IN_STOCK
      ? 'instock'
      : 'outofstock';
  }
}
