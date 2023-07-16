import { Injectable } from '@angular/core';
import { CreateCustomerRequest } from '@core/models/request/createCustomerRequest';
import { Admin, Client, User } from '@core/models/user';
import { UserRole } from '@shared/constants';
import { WooCommerceApiService } from '../woo-commerce';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private activeUser: User | undefined;

  constructor(private _wooCommerceApiService: WooCommerceApiService) {}

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

  public registerClient(client: Client): Observable<any> {
    const bodyRequest = this.mapCreateClientRequest(client);
    return this._wooCommerceApiService.postCustomer(bodyRequest)
  }

  public registerAdministrator(admin: Admin): void {
    // Registration logic for administrator
  }

  private encryptPassword(password: string): string {
    return password;
  }

  public mapCreateClientRequest(client: Client): CreateCustomerRequest {
    return {
      email: client.email,
      password: this.encryptPassword(client.password),
      role: UserRole.CLIENT
    }
}
}
