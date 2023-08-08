import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard{
  constructor(private _router: Router, private _authService: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {

    console.log('currUser', this._authService.getCurrentUser())
    const isAdmin = this._authService.isAdmin();

    if (isAdmin) {
      return true;
    } else {
      // If the user is not an admin, redirect them to a page indicating unauthorized access.
      return this._router.createUrlTree(['/blank'], {
        queryParams: { reason: 'You need administrator privileges to access this page.' }
      });
    }
  }
  
}
