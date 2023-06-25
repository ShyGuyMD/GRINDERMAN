import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private isLoggedIn: boolean = false;

  constructor() { }

  login(username: string, password: string): boolean {
    // Placeholder login request and authentication logic
    if (username === 'example' && password === 'password') {
      this.isLoggedIn = true;
      return true;
    }
    return false;
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
