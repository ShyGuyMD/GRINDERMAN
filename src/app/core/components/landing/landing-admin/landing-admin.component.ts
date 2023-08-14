import { Component } from '@angular/core';
import { ADMIN_CREATE, BOOK_CREATE, CATALOGUE, CHECKOUT } from '@shared/constants';

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
  public CATALOGUE_EXPORT: string = '';
  public CATALOGUE_IMPORT: string = '';
  public CHECKOUT: string = `/admin/${CHECKOUT}`;
  public ORDER_UPDATE: string = '';
  public ORDER_HISTORY: string = '';
  public ORDER_REPORT_EXPORT: string = '';
  public ADMIN_CREATE: string = `/admin/${ADMIN_CREATE}`;


}
