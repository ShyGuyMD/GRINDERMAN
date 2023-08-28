import { Component, HostListener, OnInit } from '@angular/core';
import { Book } from '@core/models/book';
import { BookService, CartService, NavigationService, SharedService, WooCommerceApiService } from '@core/services';
import { BLANK_PAGE, PAGE_SIZE } from '@shared/constants';

@Component({
  selector: 'app-book-catalogue',
  templateUrl: './book-catalogue.component.html',
  styleUrls: ['./book-catalogue.component.css'],
})
export class BookCatalogueComponent implements OnInit {
  books: Book[] = [];
  isLoading: boolean = true;
  itemsPerPage: number = 20;
  currentPage: number = 1;
  totalProducts: number = 100;
  completeCatalogue: boolean = false;
  keyword: string = '';

  constructor(
    private _wooCommerceService: WooCommerceApiService,
    private _bookService: BookService,
    private _sharedService: SharedService,
    private _navigationService: NavigationService,
    private _cartService: CartService
  ) {}

  ngOnInit() {
    this._sharedService.getKeyword().subscribe((keyword)=> {
        this.keyword = keyword;
        if (keyword !== '') this.initializeCatalogue();
    })

    if (!this.books.length) {
      this.initializeCatalogue();
    } else {
      this.isLoading = false;
    }
  }

  initializeCatalogue() {
    this.books = [];
    this.currentPage = 1;
    this.loadProducts();
  }

  public loadProducts(page: number = 1): void {
      this.isLoading = true;
      this.currentPage = page;
      console.log("currentPage", this.currentPage, this.keyword)

    this._bookService.getBooks(this.keyword, page).subscribe({
      next: (response) => {
        if (response.length === 0){
            this.completeCatalogue = true;
        }else{
            this.books.push(...response);
            this.totalProducts = this.books.length;
        }
        this.isLoading = false;
      },
      error: (e) => {
        console.error(e);
        const errorMessage = 'Error retrieving initial catalogue.';
        this._navigationService.navigateTo(BLANK_PAGE, errorMessage);
      },
      complete: () => console.log('Results (initial catalogue): ', this.books), // DEBUG
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const contentHeight = document.documentElement.scrollHeight;
    const offset = 100; // Distance from the bottom before triggering the load

    if (!this.completeCatalogue && (scrollY + windowHeight >= contentHeight - offset && !this.isLoading )) {
     this.loadProducts(Math.ceil(this.totalProducts / PAGE_SIZE) + 1);
    }
  }

  addToCart(book: Book) {
    this._cartService.addToCart(book, 1);
  }
}
