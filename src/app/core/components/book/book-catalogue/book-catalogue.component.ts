import { Component, OnInit } from '@angular/core';
import { Book } from '@core/models/book';
import { BookService, CartService, NavigationService, SharedService, WooCommerceApiService } from '@core/services';
import { BLANK_PAGE } from '@shared/constants';

@Component({
    selector: 'app-book-catalogue',
    templateUrl: './book-catalogue.component.html',
    styleUrls: ['./book-catalogue.component.css']
})
export class BookCatalogueComponent implements OnInit {

    books: Book[] = []; 
    isLoading: boolean = true;

    constructor(private _wooCommerceService: WooCommerceApiService,
        private _bookService: BookService,
        private _sharedService: SharedService,
        private _navigationService: NavigationService,
        private _cartService: CartService) { }

    ngOnInit() {
        this._sharedService.searchResult$.subscribe({
            next: (v) => {
                this.books = v.map((product: any) => this._bookService.mapProductToBook(product));
            },
            error: (e) => {
                console.error(e);
                const errorMessage = 'Error retrieving searched catalogue.';
                this._navigationService.navigateTo(BLANK_PAGE, errorMessage)
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
                this._navigationService.navigateTo(BLANK_PAGE, errorMessage)
            },
            complete: () => console.log('Results (initial catalogue): ', this.books) // DEBUG
        });
    }

    addToCart(book: Book) {
        this._cartService.addToCart(book, 1);
    }
}
