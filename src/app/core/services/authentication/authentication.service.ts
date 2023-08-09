import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
//---
import { HttpHeaders } from '@angular/common/http';
import { UserLoginResponse } from '@core/models/response/userLoginResponse';
import { CoCartApiService } from '../co-cart-api';
import { LocalStorageService } from '../local-storage';
import { UserService } from '../user';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private readonly jwtHelper = new JwtHelperService();

    constructor(
        private _coCartApiService: CoCartApiService,
        private _localStorageService: LocalStorageService
    ) { }

    public login(username: string, password: string): Observable<UserLoginResponse> {
        return this._coCartApiService.login(username, password);
    }

    public isAuthenticated(): boolean {
        const token = this.getJwtToken();
        return !this.jwtHelper.isTokenExpired(token);
    }

    public getJwtToken(): string | null {
        return this._localStorageService.getItem('jwt_token').replaceAll('"', '');
    }

    public setJwtToken(token: string): void {
        this._localStorageService.setItem('jwt_token', token);
    }

    public removeJwtToken(): void {
        this._localStorageService.removeItem('jwt_token');
    }

    public getAuthorizationHeader(): HttpHeaders {
        const token = this.getJwtToken();
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
}
