import { Component } from '@angular/core';
import { UserLoginResponse } from '@core/models/response/userLoginResponse';
import { AuthenticationService } from '@core/services';

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
        private _authService: AuthenticationService
    ) { }

    login(): void {

        this._authService.login(this.username, this.password).subscribe({
            next: (response: UserLoginResponse) => {
                
            },
            error: (error) => console.log('login error: ', error)
        });

        /*
        this._authService.login(this.username, this.password).pipe(
            concatMap((loginResponse: any) => {
                this._authService.setJwtToken(loginResponse.token);
                return this._userService(); 
            })
        ).subscribe({
            next: (response) => {

            },
            error: (error) => {

            }
        });*/
    }
}
