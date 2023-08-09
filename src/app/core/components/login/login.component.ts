import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginResponse } from '@core/models/response/userLoginResponse';
import { AuthenticationService, UserService } from '@core/services';

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
        private _router: Router,
        private _userService: UserService
    ) { }

    login(): void {

        this._authService.login(this.username, this.password).subscribe({
            next: (response: UserLoginResponse) => {
                this._authService.setJwtToken(response.extras.jwt_token);
                this._userService.mapUserData(response);

                console.log('login successful!');
                console.log('login response: ', response);
                console.log('jwt token in storage: ', this._authService.getJwtToken());
                console.log('logged user:', JSON.stringify(this._userService.getActiveUser()));

                if (this._userService.isAdminUser()) {
                    this._router.navigate(['/admin/home']);
                } else {
                    this._router.navigate(['/home']);
                }
            },
            error: (error) => {
                console.log('login unsuccessful');
                console.log('login error: ', error);

                this.loginError = true;
            }
        });
    }
}
