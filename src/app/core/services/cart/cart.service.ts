import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage';
import { CartItem } from '@core/models/cartItem';
import { Book } from '@core/models/book';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coupon } from '@core/models/coupon';
import { ComisionMercadoLibre, CouponType } from '@shared/constants';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private cartKey = 'my_woocommerce_cart';
    private cartItems$: BehaviorSubject<CartItem[]> = new BehaviorSubject<
        CartItem[]
    >([]);
    private coupon$: BehaviorSubject<Coupon | null> =
        new BehaviorSubject<Coupon | null>(null);
    private mercadoLibre$: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);

    constructor(private _localStorageService: LocalStorageService) {
        this.getCart();
    }

    public getCartItems(): Observable<CartItem[]> {
        return this.cartItems$.asObservable();
    }

    public getCoupon(): Observable<Coupon | null> {
        return this.coupon$.asObservable();
    }

    public setCoupon(coupon: Coupon | null): void {
        this.coupon$.next(coupon);
        console.log(coupon, this.coupon$.getValue());
    }

    public getMercadoLibre(): Observable<boolean> {
        return this.mercadoLibre$.asObservable();
    }

    public setMercadoLibre(value: boolean): void {
        this.mercadoLibre$.next(value);
        if (value) {
            this.setCoupon(null);
        }
    }

    public getComisionMercadoLibre(): Coupon | null {
        if (this.mercadoLibre$.getValue()) {
            return { value: ComisionMercadoLibre, type: CouponType.PERCENT };
        }
        return null;
    }

    private saveCart(cartItems: CartItem[]): void {
        this._localStorageService.setItem(this.cartKey, cartItems);
        this.cartItems$.next(cartItems);
    }

    addToCart(book: Book, quantity: number): void {
        const existingItem = this.cartItems$
            .getValue()
            .find((item) => item.book.id === book.id);
        const cartItems = this.cartItems$.getValue().slice();

        if (existingItem) {
            if (
                existingItem.quantity + quantity <=
                existingItem.book.availableUnits
            ) {
                existingItem.quantity += quantity;
                this.saveCart(cartItems);
            }
        } else if (book.availableUnits > 0) {
            cartItems.push({ book, quantity: quantity });
            this.saveCart(cartItems);
        }
    }
    
    removeFromCart(book: Book): void {
        const cartItems = this.cartItems$.getValue().slice();
        const index = cartItems.findIndex((item) => item.book.id === book.id);

        if (index !== -1) {
            cartItems.splice(index, 1);
            this.saveCart(cartItems);
        }
    }

    incrementQuantity(book: Book): void {
        const cartItems = this.cartItems$.getValue().slice();
        const cartItem = cartItems.find((item) => item.book.id === book.id);

        if (cartItem && cartItem.quantity < cartItem.book.availableUnits) {
            cartItem.quantity++;
            this.saveCart(cartItems);
        }
    }

    decrementQuantity(book: Book): void {
        const cartItems = this.cartItems$.getValue().slice();
        const cartItem = cartItems.find((item) => item.book.id === book.id);

        if (cartItem && cartItem.quantity > 1) {
            cartItem.quantity--;
            this.saveCart(cartItems);
        }
    }

    updateQuantity(book: Book, quantity: number): void {
        const cartItems = this.cartItems$.getValue().slice();
        const cartItem = cartItems.find((item) => item.book.id === book.id);

        if (cartItem) {
            cartItem.quantity = quantity;
            this.saveCart(cartItems);
        }
    }

    getCart(): void {
        const cartItemsString = this._localStorageService.getItem(this.cartKey);
        const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];

        this.cartItems$.next(cartItems);
    }

    clearCart(): void {
        this._localStorageService.removeItem(this.cartKey);
        this.cartItems$.next([]);
    }

    getTotalQuantity(): number {
        const cartItems = this.cartItems$.getValue();
        return cartItems.reduce((acc, item) => acc + item.quantity, 0);
    }

    getTotalAmount(): number {
        const cartItems = this.cartItems$.getValue();
        return cartItems.reduce(
            (acc, item) => acc + item.book.price * item.quantity,
            0
        );
    }

    getTotalAmountWithCoupons(): number {
        const subtotal = this.getTotalAmount();
        const coupon = this.coupon$.getValue();
        if (coupon) {
            if (coupon.type === CouponType.CREDIT) {
                return subtotal - coupon.value;
            } else {
                return subtotal - (coupon.value / 100) * subtotal;
            }
        }
        return subtotal;
    }
}
