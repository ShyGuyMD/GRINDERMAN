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
    const bookImages = [];
    if (book.cover) bookImages.push(book.cover);
    if (book.images) bookImages.push(...book.images);

    return {
      id: book.id,

      name: book.title,
      description: book.synopsis || '',
      regular_price: book.price.toString(),
      stock_quantity: book.availableUnits || 0,
      stock_status: this.injectStockStatus(book.inventoryStatus),

      images: bookImages.length ? this.injectImages(bookImages) : [],
      meta_data: this.buildMetadata(book),
      attributes: book.genre
        ? this.injectGenreOptions(book.genre)
        : this.injectGenreOptions([]),

      manage_stock: true,
      status: 'publish',
    };
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
          options: genreOptions.map((element: Genre) => element.name),
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
