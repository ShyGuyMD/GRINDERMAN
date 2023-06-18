// Angular Core
import { Component } from '@angular/core';

// PrimeNG
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  public menuItems: MenuItem[] = [];
  public activeItem: MenuItem | undefined;

  ngOnInit() {
    this.menuItems = [
      { label: 'Novedades', icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Catálogo', icon: 'pi pi-shopping-cart', routerLink: '/catalogo' },
      { label: 'Sobre Nosotros', icon: 'pi pi-info-circle', routerLink: '/nosotros' },
      { label: 'Contacto', icon: 'pi pi-envelope', routerLink: '/contacto' }
    ];

    // Set the first menu item as the active item
    this.activeItem = this.menuItems[0];
  }
}
