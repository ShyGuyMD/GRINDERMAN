import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '@core/models/book';
import {
  BookService,
  ProductService,
  UtilsService,
  WooCommerceApiService,
} from '@core/services';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-book-edit-modal',
  templateUrl: './book-edit-modal.component.html',
  styleUrls: ['./book-edit-modal.component.css'],
})
export class BookEditModalComponent {
  @ViewChild('editForm') bookForm!: NgForm;

  id!: number;
  book!: Book;
  isLoading: boolean = true;
  genreOptions: any[] = [];

  constructor(
    private _bookService: BookService,
    private _productService: ProductService,
    private _wooCommerceAPIService: WooCommerceApiService,
    private _utilService: UtilsService,
    private _ref: DynamicDialogRef,
    private _config: DynamicDialogConfig,
  ) {}

  ngOnInit() {
    this.genreOptions = this._bookService.genreOptions;
    this.id = this._config.data.bookId;
        this.book = this._utilService.cloneObject(this._config.data.bookData);
        this.book.genre = this.book.genre.map((bookGenre: any) => {
      const matchedGenre = this.genreOptions.find(
        (genreOption: any) => genreOption.name === bookGenre.name
      );
      if (matchedGenre) {
        return {
          id: matchedGenre.id,
          name: matchedGenre.name,
          slug: matchedGenre.slug,
        };
      }
      return undefined;
    });
    console.log('genres', this.genreOptions);
    console.log('config:', this._config.data);
    console.log('this.book:', this.book);
    this.isLoading = false;
  }

  save() {
    console.log('WE BE DOIN A SAVIN');
    this.isLoading = true;
    const productData = this._productService.mapBookToProduct(this.book);
    this._wooCommerceAPIService.putProductData(this.id, productData).subscribe({
      next: (v) => {
        console.log('id:', this.id);
        console.log('submitting: ', this.book);
        console.log('response: ', v);
        this._bookService.setBookData(this.book);
      },
      error: (e) => {
        console.log('error: ', e);
      },
      complete: () => this._ref.close(),
    });
  }
}
