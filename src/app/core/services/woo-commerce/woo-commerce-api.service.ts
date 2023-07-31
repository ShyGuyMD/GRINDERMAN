import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api';
import { config } from 'src/environments/environment';
import { Book } from '@core/models/book';
import { CreateProductRequest } from '@core/models/request/createProductRequest';
import { ProductService } from '../product';
import { CreateCustomerRequest } from '@core/models/request/createCustomerRequest';
import { LoginRequest } from '@core/models/request/loginRequest';

@Injectable({
  providedIn: 'root',
})
export class WooCommerceApiService {
  private baseUrl = config.baseUrl;
  private apiKey = config.apiKey;
  private apiSecret = config.apiSecret;

  private headers = new HttpHeaders({
    Authorization: 'Basic ' + btoa(`${this.apiKey}:${this.apiSecret}`),
    'Content-Type': 'application/json',
  });

  constructor(
    private _apiService: ApiService,
    private _productService: ProductService
  ) {}

  login(body: LoginRequest) {
    const url = `https://localhost/admin/wordpress/wp-json/jwt-auth/v1/token`;
    return this._apiService.post(url, body, this.headers);
  }

  getAllProducts() {
    return this._apiService.get(`${this.baseUrl}/products/`, this.headers);
  }

  getProductsById(productId: number) {
    return this._apiService.get(
      `${this.baseUrl}/products/${productId}`,
      this.headers
    );
  }

  getProductsByKeyword(keyword: string) {
    return this._apiService.get(
      `${this.baseUrl}/products?search=${keyword}`,
      this.headers
    );
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

    console.log('Request Body: ', body);

    return this._apiService.post(url, body, this.headers);
  }

  postProductAttributeTerms(productId: number, termValue: string) {
    const url = `${this.baseUrl}/products/attributes/${productId}/terms`;
    const body = { name: termValue };

    return this._apiService.post(url, body, this.headers);
  }

  putProductData(productId: number, body: any) {
    console.log('This is the ID for the API: ', productId);
    console.log('This is the Data for the API: ', body);
    return this._apiService.put(
      `${this.baseUrl}/products/${productId}`,
      body,
      this.headers
    );
  }

  public postCustomer(body: CreateCustomerRequest): any {
    const url = `${this.baseUrl}/customers`;

    return this._apiService.post(url, body, this.headers);
  }
}
