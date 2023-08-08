import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
//---
import { HttpHeaders } from '@angular/common/http';
import { UserLoginResponse } from '@core/models/response/userLoginResponse';
import { CoCartApiService } from '../co-cart-api';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private readonly jwtHelper = new JwtHelperService();

    constructor(private _coCartApiService: CoCartApiService) { }

    public login(username: string, password: string): Observable<UserLoginResponse> {
        return this._coCartApiService.login(username, password);
    }

    public isAuthenticated(): boolean {
        const token = this.getJwtToken();
        return !this.jwtHelper.isTokenExpired(token);
    }

    public getJwtToken(): string | null {
        return localStorage.getItem('jwt_token');
    }

    public setJwtToken(token: string): void {
        localStorage.setItem('jwt_token', token);
    }

    public removeJwtToken(): void {
        localStorage.removeItem('jwt_token');
    }

    public getAuthorizationHeader(): HttpHeaders {
        const token = this.getJwtToken();
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    // test
    public isAuthenticatedUser(): boolean {
        return true;
    }
}
