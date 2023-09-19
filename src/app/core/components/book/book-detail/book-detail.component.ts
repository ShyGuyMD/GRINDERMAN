import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '@core/models/book';
import { BookService, CartService, NavigationService } from '@core/services';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookEditModalComponent } from '../book-edit-modal/book-edit-modal.component';
import { BLANK_PAGE } from '@shared/constants';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  id!: number;
  book!: Book;
  isLoading: boolean = true;

  ref!: DynamicDialogRef;

  constructor(
    private _route: ActivatedRoute,
    private _navigationService: NavigationService,
    private _bookService: BookService,
    private _dialogService: DialogService,
    private _cartService: CartService,
  ) {}

  ngOnInit() {
    const idParam = this._route.snapshot.paramMap.get('id');
    this.id = Number(idParam);

    if (!idParam || isNaN(this.id)) {
      // Invalid ID or non-number value, redirect to blank component with error message
      const errorMessage = 'Invalid ID or non-number value.';
      this._navigationService.navigateTo(BLANK_PAGE, errorMessage);
      return;
    }
    this._bookService.getBookData().subscribe((book) => {
      if (book) {
        this.book = book;
        this.isLoading = false;}
    });

    this.initBook(); 
  }

  initBook(){
    this._bookService.getBookById(this.id).subscribe({
      next: (book) => {
        this._bookService.setBookData(book);
        console.log('Set Book:', this.book); // Check if you are receiving the book data here
      },
      error: (error) => {
        console.error(error);
        const errorMessage = 'Error retrieving product.';
        this._navigationService.navigateTo(BLANK_PAGE, errorMessage);
      },
    });
  }

  ngOnDestroy() {
    if (this.ref) this.ref.close();
  }

  addToCart() {
   this._cartService.addToCart(this.book, 1);
  }

  listGenres() {
    return this.book.genre.map((obj: any) => obj.name).join(', ');
  }

  getSeverity(book: Book) {
    return this._bookService.getInventorySeverity(book);
  }
}
