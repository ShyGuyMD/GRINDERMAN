import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '@core/models/book';
import { BookService, WooCommerceApiService } from '@core/services';
import { InventoryStatus } from '@shared/constants';
import { map } from 'rxjs';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
    id!: number;
    book!: Book;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _bookService: BookService,
        private _wooCommerceService: WooCommerceApiService
    ) { }

    ngOnInit() {
        const idParam = this._route.snapshot.paramMap.get('id');
        this.id = Number(idParam);

        if (!idParam || isNaN(this.id)) {
            // Invalid ID or non-number value, redirect to blank component with error message
            const errorMessage = 'Invalid ID or non-number value.';
            this._router.navigate(['/blank'], { queryParams: { error: errorMessage } });
            return;
        }

        this._wooCommerceService.getProductsById(this.id).subscribe({
            next: (response) => {
                this.book = this._bookService.mapProductToBook(response);
            },
            error: (error) => {
                console.error(error);
                const errorMessage = 'Error retrieving product.';
                this._router.navigate(['/blank'], { queryParams: { error: errorMessage } });
            }
        });

    }

    addToCart() {
        // Implement the logic to add the book to the cart
    }

    getSeverity(book: Book) {
        return this._bookService.getSeverity(book);
    }
}
