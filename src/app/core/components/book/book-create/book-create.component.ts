import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '@core/models/book';
import { WooCommerceApiService } from '@core/services';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent {
  @ViewChild('bookForm') bookForm!: NgForm;

  public book: Book = {
    isbn: '',
    title: '',
    author: '',
    genre: '',
    publisher: '',
    price: 0,
    inventoryStatus: 'IN_STOCK',
    isNew: false,
    isHardcover: false,
    isActive: true
  };

  constructor(private wooCommerceAPIService: WooCommerceApiService) { }

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

}
