import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '@core/models/book';
import { CartItem } from '@core/models/cartItem';
import { BookService, CartService, NavigationService } from '@core/services';
import { BOOK_DETAIL } from '@shared/constants';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() remove: EventEmitter<void> = new EventEmitter();

  constructor(
    private _cartService: CartService,
    private _bookService: BookService,
    private _navigationService: NavigationService
  ) {}

  onQuantityChange(): void {
    if (this.item.quantity < 1) {
      this.item.quantity = 1;
    } else if (this.item.quantity > this.item.book.availableUnits) {
      this.item.quantity = this.item.book.availableUnits;
    }
    this._cartService.updateQuantity(this.item.book, this.item.quantity);
  }

  getSubtotal(): number {
    return this.item.quantity * this.item.book.price;
  }

  goToBookDetail(book: Book) {
    const url = BOOK_DETAIL.slice(0, -3);
    this._bookService.setBookData(book);
    this._navigationService.navigateTo(`${url}${book.id}`);
  }
}
