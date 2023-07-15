import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api';
import { config } from 'src/environments/environment';
import { Book } from '@core/models/book';
import { CreateProductRequest } from '@core/models/request/createProductRequest';

@Injectable({
  providedIn: 'root'
})
export class WooCommerceApiService {

  private baseUrl = config.baseUrl;
  private apiKey = config.apiKey;
  private apiSecret = config.apiSecret;

  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(`${this.apiKey}:${this.apiSecret}`),
    'Content-Type': 'application/json'
  });

  constructor(
    private _apiService: ApiService
  ) { }

  getProducts(keyword?: string) {
    let url = `${this.baseUrl}/products`;
    url += keyword ? `?search=${keyword}` : '';
    
   return this._apiService.get(url, this.headers);
  }

  getProduct(id: number) {
    const url = `${this.baseUrl}/products/${id}`;
    
    return this._apiService.get(url, this.headers);
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
    
    console.log('This is the Book: ', book);

    const body: CreateProductRequest = {
        name: book.title,
        regular_price: book.price,
        description: book.synopsis,
        manage_stock: true,
        meta_data: [],
        attributes: [{
          "name" : "Genero", 
          "options" : book.genre?.map((element: any) => (element.name))
        }],
        status: 'publish'
    }

    console.log('Request URL: ', url);
    console.log('Request Body: ', body);

    return this._apiService.post(url, body, this.headers);
  }

  postProductAttributeTerms(productId: number, termValue: string) {
    const url = `${this.baseUrl}/products/attributes/${productId}/terms`;
    const body = { name: termValue };

    return this._apiService.post(url, body, this.headers);
  }
}
