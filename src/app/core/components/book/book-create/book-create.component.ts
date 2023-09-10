import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '@core/models/book';
import {
  BookService,
  NavigationService,
  WooCommerceApiService,
} from '@core/services';
import { BLANK_PAGE } from '@shared/constants';
@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
})
export class BookCreateComponent {
  @ViewChild('bookForm') bookForm!: NgForm;

  genreOptions: any[] = [];
  uploadedFiles: any[] = [];
  book: Book = {
    isbn: '',
    title: '',
    author: '',
    genre: [],
    publisher: '',
    price: 0,
    availableUnits: 1,
    isActive: true,
    isHardcover: false,
    isNew: false,
  };

  isLoading: boolean = true;

  constructor(
    private _wooCommerceAPIService: WooCommerceApiService,
    private _navigationService: NavigationService,
    private _bookService: BookService
  ) {}

  ngOnInit(): void {
    this._bookService.getGenreOptions().subscribe((response) => {
      this.genreOptions = response;
      this.isLoading = false;
    });
  }

  save(redirect: boolean = true) {
    console.log('clicked on save!');
    this._wooCommerceAPIService.postProduct(this.book).subscribe({
      next: (v) => {
        console.log('submitting: ', this.book);
        console.log('response: ', v);
        // TODO: REDIRECT TO DETAIL?
      },
      error: (e) => {
        const errorMessage = 'Error retrieving product.';
        console.log('error: ', e);
        this._navigationService.navigateTo(BLANK_PAGE, errorMessage);
      },
    });
  }

  cleanup() {
    console.log('clicked on save and new!');
    this.save(false);
    this.bookForm.resetForm();
  }

  onFileSelect(event: any) {
    if (event.files && event.files.length) {
      for (let file of event.files) {
        if (this.book.images) {
          this.book.images.push(file);
        }
      }
    }
  }
}
