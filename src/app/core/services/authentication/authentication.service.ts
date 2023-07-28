import { Injectable } from '@angular/core';
import { WooCommerceApiService } from '../woo-commerce';
import { LoginRequest } from '@core/models/request/loginRequest';
import { User } from '@core/models/user';
import { UserRole } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isAuthenticated: boolean = false;
  private currentUser: User | null = null;

  constructor(private _wooCommerceApiService: WooCommerceApiService) {}

  login(email: string, password: string): boolean {
    console.log(email, password);
    const loginRequest: LoginRequest = {
      email: email,
      password: password,
    };

    if (email === 'cliente@mail.com') {
      console.log('es cliente');
      this.currentUser = { email: email, password: '', role: UserRole.CLIENT };
      this.isAuthenticated = true;
    } else if (email === 'admin@mail.com') {
      console.log('es admin');
      this.currentUser = { email: email, password: '', role: UserRole.ADMIN };
      this.isAuthenticated = true;
    } else {
      // If the email is not found in the hardcoded users, authentication fails.
      this.isAuthenticated = false;
    }
    /*this._wooCommerceApiService.login(loginRequest).subscribe({
      next: (response) => {
        const authToken = response.token;
        console.log('Authentication successful!', authToken);
        localStorage.setItem('authToken', authToken);
        this.isAuthenticated = true;
      },
      error: (e: any) => {
        console.error('Authentication failed!', e);
        this.isAuthenticated = false;
      },
    });*/
    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  isAdmin(): boolean {
    console.log('isAdmin?', this.currentUser);
    if (
      this.isAuthenticated &&
      this.currentUser &&
      this.currentUser.role === UserRole.ADMIN
    ) {
      return true;
    }
    return false;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
}
