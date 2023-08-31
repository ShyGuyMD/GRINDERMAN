import { Injectable } from '@angular/core';
import { ApiService } from '../api';
import { HttpHeaders } from '@angular/common/http';
import { MPPreferencesRequest } from '@core/models/request/mpPreferencesRequest';
import { MPPreferencesResponse } from '@core/models/response/mpPreferencesResponse';

@Injectable({
    providedIn: 'root'
})
export class MercadopagoService {

    // TODO: mover a archivo de environment
    private url = 'https://api.mercadopago.com';
    private access_token = 'TEST-5723048693599353-060916-0559d3086c95aa0c3255cf8ff3eef133-1395552730';

    constructor(private _apiService: ApiService) { }

    public checkout(paymentPreference: MPPreferencesRequest): MPPreferencesResponse {
        const url = `${this.url}/checkout/preferences`;

        const headers = new HttpHeaders({
            Authorization : `Bearer ${this.access_token}`
        });

        return this._apiService.post(url, paymentPreference, headers);
    }
}