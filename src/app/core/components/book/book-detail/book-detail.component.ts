import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '@core/models/book';
import { BookService, WooCommerceApiService } from '@core/services';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookEditModalComponent } from '../book-edit-modal/book-edit-modal.component';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
    id!: number;
    book!: Book;

    ref!: DynamicDialogRef;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _bookService: BookService,
        private _wooCommerceAPIService: WooCommerceApiService,
        private _dialogService: DialogService
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

        this._wooCommerceAPIService.getProductsById(this.id).subscribe({
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

    ngOnDestroy() {
        if (this.ref) this.ref.close();
    }

    addToCart() {
        // Implement the logic to add the book to the cart
    }

    deactivate() {
        const data = { "meta_data": [{ "key": "isActive", "value": false }] };

        this._wooCommerceAPIService.putProductData(this.id, data).subscribe({
            next: (v) => console.log(`Book ID: ${this.id} deactivated`),
            error: (e) => console.log("Error in deactivation")
        });
    }

    edit() {
        console.log('edit');
        this.ref = this._dialogService.open(
            BookEditModalComponent, {
                header: this.book.title,
                dismissableMask: true,
                contentStyle:  {
                    'max-height': '700px',
                    overflow: 'auto'
                },
                baseZIndex: 10000,
                data: {
                    'bookId' : this.id,
                    'bookData' :this.book
                },
                modal: true
            }
        )
    }

    escapeSynopsis() {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = this.book?.synopsis || '';

        return tempElement.innerText;
    }

    listGenres() {
        return this.book.genre.map((obj : any) => obj.name).join(', ');
    }

    getSeverity(book: Book) {
        return this._bookService.getInventorySeverity(book);
    }
}
