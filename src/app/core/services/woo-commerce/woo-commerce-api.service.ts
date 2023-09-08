import { Injectable } from '@angular/core';
import { ApiService } from '../api';
import { config } from 'src/environments/environment';
import { Book } from '@core/models/book';
import { ProductService } from '../product';
import { CreateCustomerRequest } from '@core/models/request/createCustomerRequest';
import { AuthenticationService } from '../authentication';
import { CreateOrderRequest } from '@core/models/request/createOrderRequest';
import { CreateOrderResponse, RetrieveOrderResponse } from '@core/models/response/orderResponse';
import { Observable, forkJoin, map, mergeMap, take, takeUntil, takeWhile } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Product } from '@core/models/product';

@Injectable({
  providedIn: 'root',
})
export class WooCommerceApiService {
  private baseUrl = config.baseUrl + config.wc;
  private readonly headers = this._authService.getAuthorizationHeader();

  constructor(
    private _apiService: ApiService,
    private _authService: AuthenticationService,
    private _productService: ProductService
  ) {}


  public getAllProducts(): Observable<Product[]> {
    const maxPages = 100;
    const productObservables: Observable<Product[]>[] = [];

    for (let page = 1; page <= maxPages; page++) {
      productObservables.push(this.getProducts(page));
    }

    return forkJoin(productObservables).pipe(
      takeWhile((response) => response.length > 0), // Stop when response is empty
      map((responses) => responses.reduce((acc, curr) => acc.concat(curr), [])), // Flatten the array of arrays
      take(1)
    );
  }

  public getProducts(page: number): Observable<Product[]> {
    const url = `${this.baseUrl}/products`;
    const params = new HttpParams().set('page', page.toString());

    return this._apiService.get(url, this.headers, params);
  }

  getProductsById(productId: number) {
    const url = `${this.baseUrl}/products/${productId}`;

    return this._apiService.get(url, this.headers);
  }

  getProductsByKeyword(keyword: string, page: number = 1) {
    const url = `${this.baseUrl}/products?search=${keyword}`;
    const params = new HttpParams().set('page', page.toString());

    return this._apiService.get(url, this.headers, params);
  }

  getProductAttributes() {
    const url = `${this.baseUrl}/products/attributes`;

    return this._apiService.get(url, this.headers);
  }

  getProductAttributeTerms(attrId: number) {
    const url = `${this.baseUrl}/products/attributes/${attrId}/terms`;

    return this._apiService.get(url, this.headers);
  }

  postProduct(book: Book) {
    const url = `${this.baseUrl}/products`;

    const body = this._productService.mapBookToProduct(book);
    console.log('bookproduct', body);

    return this._apiService.post(url, body, this.headers);
  }

  postProductAttributeTerms(productId: number, termValue: string) {
    const url = `${this.baseUrl}/products/attributes/${productId}/terms`;
    const body = { name: termValue };

    return this._apiService.post(url, body, this.headers);
  }

  putProductData(productId: number, body: any) {
    const url = `${this.baseUrl}/products/${productId}`;

    return this._apiService.put(url, body, this.headers);
  }

  public postCustomer(body: CreateCustomerRequest): any {
    const url = `${this.baseUrl}/customers`;

    return this._apiService.post(url, body, this.headers);
  }

  public postOrder(body: CreateOrderRequest): Observable<CreateOrderResponse> {
    const url = `${this.baseUrl}/orders`;

    return this._apiService.post(url, body, this.headers);
  }

  public getOrdersById(orderId: number): Observable<RetrieveOrderResponse> {
    const url = `${this.baseUrl}/orders/${orderId}`;

    return this._apiService.get(url, this.headers);
  }

  public getAllOrders(): Observable<RetrieveOrderResponse[]> {
    const url = `${this.baseUrl}/orders`;

    return this._apiService.get(url, this.headers);
  }
}
