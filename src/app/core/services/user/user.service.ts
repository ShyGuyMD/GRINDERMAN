import { Injectable } from '@angular/core';
import { CreateCustomerRequest } from '@core/models/request/createCustomerRequest';
import { Admin, Client, User } from '@core/models/user';
import { UserRole } from '@shared/constants';
import { WooCommerceApiService } from '../woo-commerce';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLoginResponse } from '@core/models/response/userLoginResponse';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private activeUser$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

    constructor(
        private _wooCommerceApiService: WooCommerceApiService
    ) { }

    public mapUserData(loginResponse: UserLoginResponse): void {
        const user = {
            userId: parseInt(loginResponse.user_id),
            username: loginResponse.display_name,
            firstName: loginResponse.first_name,
            lastName: loginResponse.last_name,
            email: loginResponse.email,
            role: loginResponse.role.toLowerCase()
        };
        this.setActiveUser(user);
    }

    public getActiveUser(): Observable<User| undefined> {
        return this.activeUser$.asObservable();
    }

    public getActiveUserData(): User| undefined {
        return this.activeUser$.getValue();
    }


    public setActiveUser(user: User| undefined = undefined): void {
        this.activeUser$.next(user);
    }

    public isAdminUser(): boolean {
        return (
            Boolean(this.getActiveUser())
            && this.activeUser$.getValue()?.role === UserRole.ADMIN
        );
    }

    public isUserLoggedIn(): boolean {
        return Boolean(this.activeUser$.getValue());
    }

    public getUserName(): string {
        const user = this.activeUser$.getValue();
        if (user) {
            return user.email;
        }
        return '';
    }

    public registerClient(client: Client): Observable<any> {
        const bodyRequest = this.mapCreateClientRequest(client);
        return this._wooCommerceApiService.postCustomer(bodyRequest)
    }

    public registerAdministrator(admin: Admin): Observable<any> {
        const bodyRequest = this.mapCreateAdminRequest(admin);
        return this._wooCommerceApiService.postCustomer(bodyRequest)
    }

    private encryptPassword(password: string): string {
        return password;
    }

    public mapCreateClientRequest(client: Client): CreateCustomerRequest {
        return {
            email: client.email,
            password: this.encryptPassword(client.password!),
            role: UserRole.CLIENT
        }
    }

    public mapCreateAdminRequest(admin: Admin): CreateCustomerRequest {
        return {
            email: admin.email,
            password: this.encryptPassword(admin.password!),
            role: UserRole.ADMIN
        }
    }
}
