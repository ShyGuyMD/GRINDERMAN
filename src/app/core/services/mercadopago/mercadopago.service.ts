import { Injectable } from '@angular/core';
import { ApiService } from '../api';
import { HttpHeaders } from '@angular/common/http';
import { MPPreferencesRequest } from '@core/models/request/mpPreferencesRequest';
import { MPPreferencesResponse } from '@core/models/response/mpPreferencesResponse';
import { Observable } from 'rxjs';
import { config } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MercadopagoService {

    private url = config.mercadoPagoUrl;
    private access_token = config.mercadoPagoToken;

    constructor(private _apiService: ApiService) { }

    public checkout(paymentPreference: MPPreferencesRequest): Observable<MPPreferencesResponse> {
        const url = `${this.url}/checkout/preferences`;

        const headers = new HttpHeaders({
            Authorization : `Bearer ${this.access_token}`
        });

        return this._apiService.post<MPPreferencesResponse>(url, paymentPreference, headers);
    }
}