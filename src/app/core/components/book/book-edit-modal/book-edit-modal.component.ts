import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '@core/models/book';
import {
  BookService,
  ProductService,
  UtilsService,
  WooCommerceApiService,
} from '@core/services';
import { WordpressService } from '@core/services/wp-service/wp-service.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';

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

  @ViewChild('fileUpload') fileUpload!: FileUpload;

  constructor(
    private _bookService: BookService,
    private _productService: ProductService,
    private _wooCommerceAPIService: WooCommerceApiService,
    private _utilService: UtilsService,
    private _ref: DynamicDialogRef,
    private _config: DynamicDialogConfig,
    private _wpService: WordpressService
  ) {}

  ngOnInit() {
    this.id = this._config.data.bookId;
    this.book = this._utilService.cloneObject(this._config.data.bookData);
    this._bookService.getGenreOptions().subscribe((response) => {
      if(response.length>0){
        this.genreOptions = response;
        this.book.genre = this.book.genre.map((bookGenre: any) =>
          this.genreOptions.find((o) => o.name === bookGenre.name)
        );
        this.isLoading = false;
      }
    });

    console.log('genres', this.genreOptions);
    console.log('config:', this._config.data);
    console.log('this.book:', this.book);
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

  onFileChange(event: any){
    const file = event.currentFiles[0];

}

}
