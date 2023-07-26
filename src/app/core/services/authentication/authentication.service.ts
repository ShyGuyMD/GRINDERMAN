import { Injectable } from '@angular/core';
import { WooCommerceApiService } from '../woo-commerce';
import { LoginRequest } from '@core/models/request/loginRequest';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private isLoggedIn: boolean = false;

    constructor(private _wooCommerceApiService: WooCommerceApiService) { }

    login(email: string, password: string): boolean {

        const loginRequest: LoginRequest = {
            email: email,
            password: password
        }
        this._wooCommerceApiService.login(loginRequest).subscribe({
            next: (response) => {
              // Authentication successful, handle the response and store the token
              const authToken = response.token;
              console.log('Authentication successful!', authToken);
              // Store the token in local storage or a cookie for future use
              // For example, to store in local storage:
              localStorage.setItem('authToken', authToken);
              this.isLoggedIn = true;
            },
            error: (e: any) => {
              // Authentication failed, handle the error if needed
              console.error('Authentication failed!', e);
              this.isLoggedIn = false;
            }
        })
        return this.isLoggedIn;
    }

    logout(): void {
        // Placeholder logout and reset login status
        this.isLoggedIn = false;
    }

    getLoggedInStatus(): boolean {
        return true;
        //return this.isLoggedIn;
    }
}
