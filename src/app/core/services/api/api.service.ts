import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBodyRequest } from '@core/models/request/apiBodyRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly _API_URL = '';
  constructor(
    private _httpClient: HttpClient
  ) { }

  public post<T extends ApiBodyRequest, V>(endpoint: string, body:T): Observable<V>{
    return this._httpClient.post<V>(`${this._API_URL}/${endpoint}`, body);
  }

  public get<T>(endpoint: string): Observable<T> {
    return this._httpClient.get<T>(`${this._API_URL}/${endpoint}`);
  }
}
