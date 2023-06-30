import { Component, OnInit } from '@angular/core';
import { Book } from '@core/models/book';
import { BookService } from '@core/services';
import { InventoryStatus } from '@shared/constants';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book!: Book;

  constructor(private _bookService: BookService) { }

  ngOnInit() {
    // Fetch the book data from your API or any other source
    this.book = {
      isbn: '1234567890',
      title: 'Book Title',
      author: 'Author Name',
      genre: 'Book Genre',
      publisher: 'Publisher Name',
      price: 9.99,
      inventoryStatus: InventoryStatus.IN_STOCK,
      id: 1,
      synopsis: 'Book synopsis...',
      availableUnits: 10,
      cover: 'assets/images/placeholder.png',
      images: ['assets/images/placeholder.png', 'assets/images/placeholder.png'],
      isNew: true,
      isHardcover: false,
      isActive: true
    };

    // Move the cover image to the first position in the images array
    if (this.book.cover && this.book.images) {
      this.book.images.unshift(this.book.cover);
    }

  }

  addToCart() {
    // Implement the logic to add the book to the cart
  }

  getSeverity(book: Book){
    return this._bookService.getSeverity(book);
  }
}
