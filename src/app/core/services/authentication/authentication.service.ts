import { UserService } from '@core/services';
import { Injectable, Injector } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, map, throwError } from 'rxjs';
//---
import { HttpHeaders } from '@angular/common/http';
import { UserLoginResponse } from '@core/models/response/userLoginResponse';
import { CoCartApiService } from '../co-cart-api';
import { LocalStorageService } from '../local-storage';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private readonly jwtHelper = new JwtHelperService();

    constructor(
        private _coCartApiService: CoCartApiService,
        private _localStorageService: LocalStorageService,
        private _injector: Injector
    ) { }

    public login(username: string, password: string): Observable<UserLoginResponse> {
        return this._coCartApiService.login(username, password).pipe(
            map((response: UserLoginResponse) => {
                this.handleLoginResponse(response);
                return response;
            }),
            catchError(() => {
                const error = new Error('El login falló.');
                return throwError(() => error);
            })
        );
    }

    public handleLoginResponse(response: UserLoginResponse) {
        //this.setJwtToken(response.extras.jwt_token);
        const userService = this._injector.get(UserService)
        userService.mapUserData(response);
    }

    public logout(): void {
        //this.removeJwtToken();
        const userService = this._injector.get(UserService)
        userService.setActiveUser()
        console.log("LOGOUT")
    }

    // -- ENHANCEMENT: Usar JWT para autenticación de APIs y Usuarios.

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

    // ----------
}
