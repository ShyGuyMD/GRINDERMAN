import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '@core/models/book';
import { BookService, WooCommerceApiService } from '@core/services';

@Component({
  selector: 'app-book-catalog',
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.css']
})
export class BookCatalogComponent implements OnInit {
  books: Book[] = []; // Replace with your own book array

  constructor(private _wooCommerceService : WooCommerceApiService, 
    private _bookService: BookService,
    private _router: Router,) { }

  ngOnInit() {

    this._wooCommerceService.getProducts().subscribe({
      next: (response) => {
         // Map each product to a book
      this.books = response.map((product: any) =>
      this._bookService.mapProductToBook(product)
    );

      },
      error: (error) => {
        console.error(error);
        const errorMessage = 'Error retrieving cataloge.';
        this._router.navigate(['/blank'], { queryParams: { error: errorMessage } });
      }
    });

  }

  addToCart(book: Book) {
    // Implement your logic to add the book to the cart
    console.log('Book added to cart:', book);
  }
}
