import { Component } from '@angular/core';
import { AuthenticationService } from '@core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public logo: String = 'assets/images/logo.jpg';
  public isLoggedIn : boolean = false;

  constructor(private _authService : AuthenticationService){}

  ngOnInit(): void {
    this.isLoggedIn = this._authService.getLoggedInStatus();
  }

}
