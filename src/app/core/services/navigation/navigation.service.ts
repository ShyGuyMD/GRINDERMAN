import { Injectable } from '@angular/core';
import { UserService } from '../user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private _userService: UserService, private _router: Router) { }

  navigateTo(originalUrl: string, error?: string, success?: string ){

    console.log(originalUrl, error, success);

    const url: string = this._userService.isAdminUser() ? `/admin${originalUrl}` : originalUrl;

    return this._router.navigate([url], {
      queryParams: {
        error: error,
        success: success
      },
    });
  }
}
