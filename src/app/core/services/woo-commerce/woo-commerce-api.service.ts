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
    'Authorization': `Basic ${this.apiKey}:${this.apiSecret}`,
    'Content-Type': 'application/json'
  });

  constructor(private apiService: ApiService) { }

  getProducts() {
    const url = `${this.baseUrl}/products`;
    return this.apiService.get(url, this.headers);
  }

  createProduct(product: Book) {
    const url = `${this.baseUrl}/products`;

    const body: CreateProductRequest = {
      name: product.title,
      regular_price: product.price,
      description: product.synopsis,
      stock_quantity: product.availableUnits,
      manage_stock: true,
      categories: [],
      images: [],
      meta_data: []
    }

  }
}
