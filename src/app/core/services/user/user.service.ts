import { Injectable } from '@angular/core';
import { Admin, Client, User } from '@core/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private activeUser: User | undefined;

  constructor() {}

  public setUserData(user: User): void {
    this.activeUser = user;
  }

  public getUserData(): any {
    return this.activeUser;
  }

  public getUserName(): string {
    if (this.activeUser) {
      return this.activeUser?.email;
    }
    return '';
  }

  public registerClient(client: Client): void {
    // Registration logic for client
  }

  public registerAdministrator(admin: Admin): void {
    // Registration logic for administrator
  }

  public validatePassword(password: string): boolean {
    return true;
  }

  public valitdateEmail(email: string): boolean {
    // Add your email validation logic here
    return true;
  }

  private encryptPassword(password: string): string {
    return '';
  }
}
