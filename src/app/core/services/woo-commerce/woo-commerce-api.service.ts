import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api';
import { config } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WooCommerceApiService {

  private baseUrl = config.baseUrl;
  private apiKey = config.apiKey;
  private apiSecret = config.apiSecret;

  private headers = new HttpHeaders({
    'Authorization' : `Basic ${this.apiKey}:${this.apiSecret}`,
    'Content-Type' : 'application/json'
  });

  constructor(private apiService : ApiService) { }

  getProducts() {
    const url = `${this.baseUrl}/products`;
    return this.apiService.get(url, this.headers);
  }
}
