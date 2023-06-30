import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '@core/models/book';
import { WooCommerceApiService } from '@core/services';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
})
export class BookCreateComponent {
  @ViewChild('bookForm') bookForm!: NgForm;
  public genreOptions: any[] = [
    { label: 'Action', value: 'action' },
    { label: 'Adventure', value: 'adventure' },
    { label: 'Comedy', value: 'comedy' },
  ];
  uploadedFiles: any[] = [];

  public book: Book = {
    isbn: '',
    title: '',
    author: '',
    genre: '',
    publisher: '',
    price: 0,
    images: [],
    isNew: false,
    isHardcover: false,
    isActive: true,
  };

  constructor(private wooCommerceAPIService: WooCommerceApiService) {}

  save(redirect: boolean = true) {
    console.log('clicked on save!');
    // llamar al servicio de woocommerce
    console.log('submitting: ', this.book);
    console.log('redirecting...', redirect);
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
