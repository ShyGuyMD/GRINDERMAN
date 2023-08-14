import { Component } from '@angular/core';
import { HOME} from '@shared/constants';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent {
  public menuItems: MenuItem[] = [];
  public activeItem: MenuItem | undefined;

  ngOnInit() {
      this.menuItems = [
          { label: 'Home', icon: 'pi pi-home', routerLink: `admin/${HOME}` }
      ];

      // Set the first menu item as the active item
      this.activeItem = this.menuItems[0];
  }
}
