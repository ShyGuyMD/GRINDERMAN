import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginResponse } from '@core/models/response/userLoginResponse';
import { AuthenticationService, NavigationService, UserService } from '@core/services';
import { HOME, Severity } from '@shared/constants';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    loginError: boolean = false;

    constructor(
        private _authService: AuthenticationService,
        private _navigationService: NavigationService,
    ) { }

    login(): void {

        this._authService.login(this.username, this.password).subscribe({
            next: () => {
                this._navigationService.navigateTo(HOME);
            },
            error: () => {
                this.loginError = true;
            }
        });
    }

}
