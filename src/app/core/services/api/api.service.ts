import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }

    public get(url: string, headers: HttpHeaders = new HttpHeaders(), params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(url, { headers, params });
    }

    public post(url: string, body: any, headers: HttpHeaders = new HttpHeaders()): Observable<any> {
        return this.http.post(url, body, { headers });
    }

    public put(url: string, body: any, headers: HttpHeaders = new HttpHeaders()): Observable<any> {
        return this.http.put(url, body, { headers })
    }
}
