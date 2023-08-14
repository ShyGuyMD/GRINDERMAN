import { Component } from '@angular/core';
import { UserService } from '@core/services';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {
  public logo: String = 'assets/images/logo.jpg';

  constructor() { }

  ngOnInit(): void {
  }
}
