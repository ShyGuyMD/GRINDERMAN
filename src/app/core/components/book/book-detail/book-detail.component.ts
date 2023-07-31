import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '@core/models/book';
import { BookService } from '@core/services';
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
  isLoading: boolean = true;

  ref!: DynamicDialogRef;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _bookService: BookService,
    private _dialogService: DialogService
  ) {}

  ngOnInit() {
    const idParam = this._route.snapshot.paramMap.get('id');
    this.id = Number(idParam);

    if (!idParam || isNaN(this.id)) {
      // Invalid ID or non-number value, redirect to blank component with error message
      const errorMessage = 'Invalid ID or non-number value.';
      this._router.navigate(['/blank'], {
        queryParams: { error: errorMessage },
      });
      return;
    }
    this._bookService.getBookData().subscribe((book) => {
      if (book) {
        this.book = book;
        this.isLoading = false;}
    });

    this._bookService.getBookById(this.id).subscribe({
      next: (book) => {
        this._bookService.setBookData(book);
        console.log('Set Book:', this.book); // Check if you are receiving the book data here
      },
      error: (error) => {
        console.error(error);
        const errorMessage = 'Error retrieving product.';
        this._router.navigate(['/blank'], {
          queryParams: { error: errorMessage },
        });
      },
    });
  }

  ngOnDestroy() {
    if (this.ref) this.ref.close();
  }

  addToCart() {
    // Implement the logic to add the book to the cart
  }

  deactivate() {
    this._bookService.deactivateBook(this.id).subscribe((response) => {
      if (response) {
        console.log(`Book ID: ${this.id} deactivated`);
        this.book.isActive = false;
      } else {
        console.log('Error in deactivation');
      }
    });
  }

  public edit(): void {
    console.log('edit');
    this.ref = this._dialogService.open(BookEditModalComponent, {
      header: this.book.title,
      dismissableMask: true,
      contentStyle: {
        'max-height': '700px',
        overflow: 'auto',
      },
      baseZIndex: 10000,
      data: {
        bookId: this.id,
        bookData: this.book,
      },
      modal: true,
    });
  }


  listGenres() {
    return this.book.genre.map((obj: any) => obj.name).join(', ');
  }

  getSeverity(book: Book) {
    return this._bookService.getInventorySeverity(book);
  }
}
