import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '@core/models/book';
import { BookService, ProductService, WooCommerceApiService } from '@core/services';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-book-edit-modal',
  templateUrl: './book-edit-modal.component.html',
  styleUrls: ['./book-edit-modal.component.css']
})
export class BookEditModalComponent {
    @ViewChild('editForm') bookForm!: NgForm;

    id!: number;
    book!: Book;
    genreOptions: any[] = [];

    constructor(
        private _bookService: BookService,
        private _productService : ProductService,
        private _wooCommerceAPIService: WooCommerceApiService,
        private _ref: DynamicDialogRef,
        private _config: DynamicDialogConfig
    ) {
        // Genre Options
        this.genreOptions = this._bookService.genreOptions;
    }

    ngOnInit() {
        // TODO: Consider hitting the API again to retrieve the latest info just in case
        this.id = this._config.data.bookId;
        this.book = structuredClone(this._config.data.bookData);

        console.log('config:', this._config.data);
        console.log('this.book:', this.book);
    }

    save() {
        console.log('WE BE DOIN A SAVIN');
        const productData = this._productService.mapBookToProduct(this.book);
        this._wooCommerceAPIService.putProductData(this.id, productData).subscribe({
            next: (v) => {
                console.log('id:',  this.id)
                console.log('submitting: ', this.book);
                console.log('response: ', v);
                // TODO: REDIRECT TO DETAIL?
            },
            error: (e) => {
                console.log('error: ', e);
            }
        });
        this._ref.close();
    }
}
