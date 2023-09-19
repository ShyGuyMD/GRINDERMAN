import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '@core/models/book';
import { BookService, CartService, NavigationService } from '@core/services';
import { BLANK_PAGE, Severity } from '@shared/constants';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { BookEditModalComponent } from '../../book-edit-modal/book-edit-modal.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-detail-admin',
  templateUrl: './book-detail-admin.component.html',
  styleUrls: ['./book-detail-admin.component.css']
})
export class BookDetailAdminComponent {
  id!: number;
  book!: Book;
  isLoading: boolean = true;
  isChangingStatus: boolean = false;

  ref!: DynamicDialogRef;

  constructor(
    private _route: ActivatedRoute,
    private _navigationService: NavigationService,
    private _bookService: BookService,
    private _dialogService: DialogService,
    private _cartService: CartService,
    private _messageService: MessageService
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

  changeStatus() {
    this.isChangingStatus = true;
    this._bookService.toggleBookisActive(this.book).subscribe((response: Book) => {
      if (response) {
        this._bookService.setBookData(response);
        if(response.isActive){
          this._messageService.add({
          severity: Severity.SUCCESS,
          summary: '¡Éxito!',
          detail:  `Se ha activado la publicación de ${response.title}`
        })
        }else{
          this._messageService.add({
          severity: Severity.SUCCESS,
          summary: '¡Éxito!',
          detail:  `Se ha desactivado la publicación de ${response.title}`
        })
        }
      } else {
        this._messageService.add({
          severity: Severity.ERROR,
          summary: '¡Upss!',
          detail: 'Ha habido un error en el cambio de estado de libro.'
        })
      }
      this.isChangingStatus = false;
    });
  }

  public edit(): void {
    console.log('edit');
    this.ref = this._dialogService.open(BookEditModalComponent, {
      header: this.book.title,
      dismissableMask: true,
      width: '80%',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        bookId: this.id,
        bookData: this.book,
      },
      modal: true,
    });
    this.ref.onClose.subscribe((result: boolean) => {
      if(result){
        this.initBook();
      }
    });
  }

  listGenres() {
    return this.book.genre.map((obj: any) => obj.name).join(', ');
  }

  getInventorySeverity(book: Book) {
    return this._bookService.getInventorySeverity(book);
  }

  getStatusSeverity(book: Book) {
    return this._bookService.getStatusSeverity(book);
  }
}
