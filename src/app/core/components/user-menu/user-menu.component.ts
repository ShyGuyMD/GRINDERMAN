import { Component } from '@angular/core';
import { UserService } from '@core/services';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent {
    public userName: string = '';

    constructor(private _userService: UserService) { }

    ngOnInit() {
        this.userName = this._userService.getActiveUser()?.firstName!;
    }
    
    public logout(): void{
        console.log("logout");
    }
}
