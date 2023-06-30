import { Injectable } from '@angular/core';
import { Book } from '@core/models/book';
import { InventoryStatus } from '@shared/constants';

@Injectable({
  providedIn: 'root'
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
}
