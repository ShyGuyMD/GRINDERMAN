import { Component } from '@angular/core';
import {  UserService } from '@core/services';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    public logo: String = 'assets/images/logo.jpg';
    public isLoggedIn: boolean = false;

    constructor(private _userService: UserService) { }

    ngOnInit(): void {
        this.isLoggedIn = this._userService.isUserLoggedIn();
    }

}
