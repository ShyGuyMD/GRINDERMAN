// Angular Core
import { Component } from '@angular/core';
import { AuthenticationService } from '@core/services';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(private _authService: AuthenticationService) {}

  public checkLoginStatus(): void {
    const loggedInStatus = this._authService.getLoggedInStatus();
    console.log('Logged in status:', loggedInStatus);
  }
}
