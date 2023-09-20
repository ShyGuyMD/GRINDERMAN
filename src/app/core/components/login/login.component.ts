import { Component } from '@angular/core';
import { UserLoginResponse } from '@core/models/response/userLoginResponse';
import { AuthenticationService, NavigationService } from '@core/services';
import { CLIENT_CREATE, HOME} from '@shared/constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    loginError: boolean = false;
    isLoading: boolean = false;

    constructor(
        private _authService: AuthenticationService,
        private _navigationService: NavigationService,
    ) { }

    login(): void {
        this.isLoading= true;
        this._authService.login(this.username, this.password).subscribe({
            next: (response: UserLoginResponse) => {
                this.isLoading=false;
                this._navigationService.navigateTo(HOME);
            },
            error: () => {
                this.isLoading=false;
                this.loginError = true;
            }
        });
    }
    register():void{
        this._navigationService.navigateTo(CLIENT_CREATE);
    }

}
