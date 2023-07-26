import { Component } from '@angular/core';
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

  constructor(private authService: AuthenticationService) {}

  login(): void {
    const isLoggedIn = this.authService.login(this.email, this.password);
    if (!isLoggedIn) {
      this.loginError = true;
    }
  }
}
