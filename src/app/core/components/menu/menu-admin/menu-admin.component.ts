import { Component } from '@angular/core';
import { ADMIN_CREATE, BOOK_CREATE, BOOK_EXPORT, BOOK_IMPORT, CATALOGUE, CHECKOUT, HOME, ORDER_REPORT} from '@shared/constants';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent {
  public menuItems: MenuItem[] = [];
  public activeItem: MenuItem | undefined;

  private BOOK_SEARCH: string = '';
  private BOOK_CREATE: string = `/admin/${BOOK_CREATE}`;
  private CATALOGUE: string = `/admin/${CATALOGUE}`;
  private CATALOGUE_EXPORT: string = `/admin/${BOOK_EXPORT}`;
  private CATALOGUE_IMPORT: string = `/admin/${BOOK_IMPORT}`;;
  private CHECKOUT: string = `/admin/${CHECKOUT}`;
  private ORDER_UPDATE: string = '';
  private ORDER_HISTORY: string = '';
  private ORDER_REPORT_EXPORT: string = `/admin/${ORDER_REPORT}`;
  private ADMIN_CREATE: string = `/admin/${ADMIN_CREATE}`;

  ngOnInit() {
      this.menuItems = [
          { label: 'Home', icon: 'pi pi-home', routerLink: `${HOME}` },
          { label: 'Libros', icon: 'pi pi-book', items: [
            { label: 'Registrar nuevo libro', icon: 'pi pi-plus', routerLink: `${this.BOOK_CREATE}` },
            { label: 'Gestionar libro', icon: 'pi pi-pencil', disabled:true},
          ] },
          { label: 'Catálogo', icon: 'pi pi-home', items: [
            { label: 'Ver catálogo', icon: 'pi pi-table', routerLink: `${this.CATALOGUE}` },
            { label: 'Exportar/Gestionar catálogo', icon: 'pi pi-list', routerLink: `${this.CATALOGUE_EXPORT}` },
            { label: 'Importar catálogo', icon: 'pi pi-upload', routerLink: `${this.CATALOGUE_IMPORT}` },
          ] },
          { label: 'Ventas', icon: 'pi pi-home', items: [
            { label: 'Registrar nueva venta', icon: 'pi pi-plus', routerLink: `${this.CHECKOUT}` },
            { label: 'Gestionar venta', icon: 'pi pi-pencil', disabled:true },
            { label: 'Reporte de ventas', icon: 'pi pi-chart-line', routerLink: `${this.ORDER_REPORT_EXPORT}` },
          ] },
          { label: 'Usuarios', icon: 'pi pi-home', items: [
            { label: 'Registrar nuevo administrador', icon: 'pi pi-plus', routerLink: `${this.ADMIN_CREATE}` }
          ] }
      ];

      // Set the first menu item as the active item
      this.activeItem = this.menuItems[0];
  }
}
