import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '@core/services';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {
    constructor(
        private _router: Router,
        private _userService: UserService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree {

        console.log('currUser', this._userService.getActiveUser());

        if(!this._userService.isUserLoggedIn()){
            return this._router.createUrlTree(['/login'])
        }

        if (this._userService.isAdminUser()) {
            return true;
        } else {
            // If the user is not an admin, redirect them to a page indicating unauthorized access.
            return this._router.createUrlTree(['/blank'], {
                queryParams: { error: 'You need administrator privileges to access this page.' }
            });
        }
    }

}
