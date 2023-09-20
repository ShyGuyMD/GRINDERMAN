import { Injectable } from '@angular/core';
import { ApiService } from '../api';
import { config } from 'src/environments/environment';
import { Book } from '@core/models/book';
import { ProductService } from '../product';
import { CreateCustomerRequest } from '@core/models/request/createCustomerRequest';
import { CreateOrderRequest } from '@core/models/request/createOrderRequest';
import { CreateOrderResponse, RetrieveOrderResponse } from '@core/models/response/orderResponse';
import { Observable, forkJoin, map, take, takeWhile } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from '@core/models/product';
import { ApiBodyRequest } from '@core/models/request/apiBodyRequest';

@Injectable({
    providedIn: 'root',
})
export class WooCommerceApiService {
    private baseUrl = config.baseUrl + config.wc;
    private headers = new HttpHeaders()
                        .set('Authorization', 'Basic ' + btoa(`${config.apiKey}:${config.apiSecret}`))
                        .set('Content-Type', 'application/json');

    constructor(
        private _apiService: ApiService,
        private _productService: ProductService
    ) { }

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

    public getProductsById(productId: number) {
        const url = `${this.baseUrl}/products/${productId}`;

        return this._apiService.get(url, this.headers);
    }

    public getProductsByKeyword(keyword: string, page: number = 1) {
        const url = `${this.baseUrl}/products`;
        const params = new HttpParams()
            .set('search', keyword)
            .set('page', page.toString());

        return this._apiService.get(url, this.headers, params);
    }

    public getProductAttributes() {
        const url = `${this.baseUrl}/products/attributes`;

        return this._apiService.get(url, this.headers);
    }

    public getProductAttributeTerms(attrId: number, page: number) {
        const url = `${this.baseUrl}/products/attributes/${attrId}/terms`;
        const params = new HttpParams().set('page', page.toString());

        return this._apiService.get(url, this.headers, params);
    }

    public getAllProductAttributeTerms(attrId: number): Observable<Product[]> {
        const maxPages = 10;
        const attrObservables: Observable<any[]>[] = [];

        for (let page = 1; page <= maxPages; page++) {
            attrObservables.push(this.getProductAttributeTerms(attrId, page));
        }

        return forkJoin(attrObservables).pipe(
            takeWhile((responses) => responses.length > 0), // Stop when response is empty
            map((responses) => responses.reduce((acc, curr) => acc.concat(curr), [])), // Flatten the array of arrays
            take(1)
        );
    }

    public postProduct(book: Book) {
        const url = `${this.baseUrl}/products`;

        const body = this._productService.mapBookToProduct(book);
        console.log('bookproduct', body);

        return this._apiService.post(url, body, this.headers);
    }

    public postProductAttributeTerms(productId: number, termValue: string) {
        const url = `${this.baseUrl}/products/attributes/${productId}/terms`;
        const body = { name: termValue };

        return this._apiService.post(url, body, this.headers);
    }

    public putProductData(book: Book) {
        const url = `${this.baseUrl}/products/${book.id}`;
        const body = this._productService.mapBookToProduct(book);
        return this._apiService.put(url, body, this.headers);
    }

    public putPartialProductData(partBook: Partial<Book>) {
        const url = `${this.baseUrl}/products/${partBook.id}`;
        const body = this._productService.mapPartialBookToProduct(partBook);
        return this._apiService.put(url, body, this.headers);
    }

    public batchUpdateProducts(create: Book[], update: Book[], del: number[] = []) {
        const createProducts = create.map(book => this._productService.mapBookToProduct(book));
        const updateProducts = update.map(book => this._productService.mapBookToProduct(book));

        const url = `${this.baseUrl}/products/batch`;

        const request: ApiBodyRequest = {
            create: createProducts,
            update: updateProducts,
            delete: del
        }
        return this._apiService.post(url, request, this.headers);
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
