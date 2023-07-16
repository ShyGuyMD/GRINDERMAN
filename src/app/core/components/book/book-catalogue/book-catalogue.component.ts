import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '@core/models/book';
import { BookService, SharedService, WooCommerceApiService } from '@core/services';

@Component({
    selector: 'app-book-catalogue',
    templateUrl: './book-catalogue.component.html',
    styleUrls: ['./book-catalogue.component.css']
})
export class BookCatalogueComponent implements OnInit {

    books: Book[] = []; // Replace with your own book array
    isLoading: boolean = true;

    constructor(private _wooCommerceService: WooCommerceApiService,
        private _bookService: BookService,
        private _sharedService: SharedService,
        private _router: Router) { }

    ngOnInit() {
        this._sharedService.searchResult$.subscribe({
            next: (v) => {
                this.books = v.map((product: any) => this._bookService.mapProductToBook(product));
            },
            error: (e) => {
                console.error(e);
                const errorMessage = 'Error retrieving searched catalogue.';
                this._router.navigate(['/blank'], { queryParams: { error: errorMessage } });
            },
            complete: () => console.log('Results (after searching): ', this.books) // DEBUG
        });

        if (!this.books.length) {
            this.initializeCatalogue();
        } else {
            this.isLoading = false;
        }

    }

    initializeCatalogue() {
        this._wooCommerceService.getAllProducts().subscribe({
            next: (response) => {
                this.books = response.map((product: any) => this._bookService.mapProductToBook(product));
                this.isLoading = false;
            },
            error: (e) => {
                console.error(e);
                const errorMessage = 'Error retrieving initial catalogue.';
                this._router.navigate(['/blank'], { queryParams: { error: errorMessage } });
            },
            complete: () => console.log('Results (initial catalogue): ', this.books) // DEBUG
        });
    }

    addToCart(book: Book) {
        // Implement your logic to add the book to the cart
        console.log('Book added to cart:', book);
    }
}
