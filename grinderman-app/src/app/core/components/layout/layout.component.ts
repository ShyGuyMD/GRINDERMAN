// Angular Core
import { Component } from '@angular/core';

// PrimeNG
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Products', icon: 'pi pi-shopping-cart', routerLink: '/products' },
      { label: 'Services', icon: 'pi pi-cog', routerLink: '/services' },
      { label: 'About', icon: 'pi pi-info-circle', routerLink: '/about' },
      { label: 'Contact', icon: 'pi pi-envelope', routerLink: '/contact' }
    ];

    // Set the first menu item as the active item
    this.activeItem = this.items[0];
  }

}
