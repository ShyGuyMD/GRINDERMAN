import { authenticationServiceMock } from './../../mocks/authentication.service.mock';
import { Component } from '@angular/core';
import { AuthenticationService, NavigationService, UserService } from '@core/services';
import { LOGIN } from '@shared/constants';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent {
    public userName: string = '';
    

    constructor(private _userService: UserService, 
        private _authService: AuthenticationService, 
        private _navigationService : NavigationService) { }

    ngOnInit() {
        this._userService.getActiveUser().subscribe((activeUser)=>{
            if(activeUser){
                this.userName = activeUser.firstName
            }else{
                this.userName = '';
            }
        });
    }
    
    public logout(): void{
        this._authService.logout();
        this._navigationService.navigateTo(LOGIN);
    }
}
