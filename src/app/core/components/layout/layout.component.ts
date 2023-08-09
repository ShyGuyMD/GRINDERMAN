// Angular Core
import { Component } from '@angular/core';
import { UserService } from '@core/services';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
    constructor(private _userService: UserService) { }

    public checkLoginStatus(): void {
        const loggedInStatus = this._userService.isUserLoggedIn();
        console.log('Logged in status:', loggedInStatus);
    }
}
