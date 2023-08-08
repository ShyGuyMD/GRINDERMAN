import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private _authService: AuthenticationService,
    private _router: Router) {}

  login(): void {
    const isLoggedIn = this._authService.login(this.email, this.password);
    if (!isLoggedIn) {
      this.loginError = true;
    } else {
      if (this._authService.isAdmin()){
        this._router.navigate(['/admin']);
      } else{
        this._router.navigate(['/home']);
      }
    }
  }
}
