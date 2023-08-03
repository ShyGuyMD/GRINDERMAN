import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage';
import { CartItem } from '@core/models/cartItem';
import { Book } from '@core/models/book';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'my_woocommerce_cart';
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  
  constructor(private _localStorageService: LocalStorageService) { 
    this.getCart();
  }

  private saveCart(cartItems: CartItem[]): void {
    this._localStorageService.saveData(this.cartKey, cartItems);
    this.cartItemsSubject.next(cartItems);
  }

  addToCart(book: Book): void {
    const existingItem = this.cartItemsSubject.getValue().find((item) => item.book.id === book.id);
    const cartItems = this.cartItemsSubject.getValue().slice();

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({ book, quantity: 1 });
    }

    this.saveCart(cartItems);
  }
  removeFromCart(book: Book): void {
    const cartItems = this.cartItemsSubject.getValue().slice();
    const index = cartItems.findIndex((item) => item.book.id === book.id);

    if (index !== -1) {
      cartItems.splice(index, 1);
      this.saveCart(cartItems);
    }
  }

  getCart(): void {
    const cartItems = this._localStorageService.getData(this.cartKey) || [];
    this.cartItemsSubject.next(cartItems);
  }

  clearCart(): void {
    this._localStorageService.removeData(this.cartKey);
    this.cartItemsSubject.next([]);
  }

  getTotalQuantity(): number {
    const cartItems = this.cartItemsSubject.getValue();
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotalAmount(): number {
    const cartItems = this.cartItemsSubject.getValue();
    return cartItems.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
  }
}
