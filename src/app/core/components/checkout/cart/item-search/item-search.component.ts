import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '@core/models/book';
import { CartItem } from '@core/models/cartItem';
import { BookService, NavigationService, SharedService, WooCommerceApiService } from '@core/services';
import { BLANK_PAGE } from '@shared/constants';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent {
  @Output() addItem = new EventEmitter<any>();

  searchTerm = new Subject<string>();
  isLoading = false;
  selectedBook: Book|undefined;
  selectedQuantity: number = 1;
  bookOptions: Book[] = []; 

  constructor(
      private _sharedService: SharedService,
      private _wooCommerceAPIService: WooCommerceApiService,
      private _bookService: BookService,
      private _navigationService: NavigationService) { }

  ngOnInit() {
      this.searchTerm.pipe(
          debounceTime(300) // tiempo en ms a esperar por otro keyup antes de mandar el request
      ).subscribe({
          next: (v) => {
              this.isLoading = true;
              this.performSearch(v)
          },
          error: (e) => console.log('Error Debouncing: ', e)
      });
      this._sharedService.searchResult$.subscribe({
        next: (v) => {
          this.bookOptions = v.map((product: any) => this._bookService.mapProductToBook(product));
          console.log(this.bookOptions);
        },
        error: (e) => {
            console.error(e);
            const errorMessage = 'Error retrieving searched catalogue.';
            this._navigationService.navigateTo(BLANK_PAGE, errorMessage)
        },
        complete: () => console.log('Results (after searching): ', this.bookOptions) // DEBUG
    });
  }

  handleSearchEvent(keyword: string) {
      this.searchTerm.next(keyword);
  }

  performSearch(keyword: string) {
      this._wooCommerceAPIService.getProductsByKeyword(keyword).subscribe({
          next: (v) => this._sharedService.setSearchResults(v),
          error: (e) => console.log('Error in Search API: ', e),
          complete: () => this.isLoading = false
      });
  }
  

  addItemToCart() {
    if (this.selectedBook) {
      const itemToAdd: CartItem = {
        book: this.selectedBook,
        quantity: this.selectedQuantity,
      };

      this.addItem.emit(itemToAdd);

      // Clear selected values
      this.selectedBook = undefined;
      this.selectedQuantity = 1;
    }
  }
}
