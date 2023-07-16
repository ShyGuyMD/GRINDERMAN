import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userData: any; // Placeholder for user data

    constructor() { }

    public setUserData(userData: any): void {
        this.userData = userData;
    }

    public getUserData(): any {
        return this.userData;
    }

    public getUserName(): string {
        return 'Bilbo Baggins';
    }

    registerClient(email: string, password: string): void {
        // Registration logic for client
      }
    
      registerAdministrator(email: string, password: string): void {
        // Registration logic for administrator
      }
    
      validatePassword(password: string): boolean {
        return true;
      }
    
      encryptPassword(password: string): string {
        return '';
      }
}
