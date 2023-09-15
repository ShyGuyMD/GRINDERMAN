import { Injectable } from '@angular/core';
import { ApiService } from '../api';
import { config } from 'src/environments/environment';
import { UserLoginResponse } from '@core/models/response/userLoginResponse';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoCartApiService {

    private readonly apiUrl = config.baseUrl + config.cc;

    constructor(
        private _apiService: ApiService
    ) { }

    public login(username: string, password: string): Observable<UserLoginResponse> {

        const credentials = `${username}:${password}`;
        const headers = new HttpHeaders()
                            .set('Authorization', `Basic ${btoa(credentials)}`)
                            .set('Content-Type', 'application/json');

        const url = `${this.apiUrl}/login`;
        return this._apiService.post(url, '', headers);
    }
}
