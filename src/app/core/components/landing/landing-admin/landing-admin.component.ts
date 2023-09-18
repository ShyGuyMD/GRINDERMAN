import { Component } from '@angular/core';
import { ADMIN_CREATE, BOOK_CREATE, BOOK_EXPORT, BOOK_IMPORT, CATALOGUE, CHECKOUT, ORDER_REPORT } from '@shared/constants';

@Component({
  selector: 'app-landing-admin',
  templateUrl: './landing-admin.component.html',
  styleUrls: ['./landing-admin.component.css']
})
export class LandingAdminComponent {

  public BOOK_SEARCH: string = '';
  public BOOK_CREATE: string = `/admin/${BOOK_CREATE}`;
  public CATALOGUE: string = `/admin/${CATALOGUE}`;
  public CATALOGUE_UPDATE: string = '';
  public CATALOGUE_EXPORT: string = `/admin/${BOOK_EXPORT}`;
  public CATALOGUE_IMPORT: string = `/admin/${BOOK_IMPORT}`;;
  public CHECKOUT: string = `/admin/${CHECKOUT}`;
  public ORDER_UPDATE: string = '';
  public ORDER_HISTORY: string = '';
  public ORDER_REPORT_EXPORT: string = `/admin/${ORDER_REPORT}`;
  public ADMIN_CREATE: string = `/admin/${ADMIN_CREATE}`;


}
