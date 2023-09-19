import { Component } from '@angular/core';
import {  NavigationService, UserService } from '@core/services';
import { CLIENT_CREATE, LOGIN } from '@shared/constants';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    public logo: String = 'assets/images/logo.jpg';
    public isLoggedIn: boolean = false;

    constructor(private _userService: UserService, private _navigationService: NavigationService) { }

    ngOnInit(): void {
        this.isLoggedIn = this._userService.isUserLoggedIn();
    }

    public loginPage():void{
        this._navigationService.navigateTo(LOGIN);
    }
}
