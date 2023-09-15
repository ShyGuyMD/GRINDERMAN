import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import your components for routing
import { StyleTemplateComponent } from './style-template/style-template.component';
import { LayoutComponent } from '@core/components/layout/layout.component';
import {
  BookCatalogueComponent,
  BookCreateComponent,
  BookDetailComponent,
  BookExportComponent,
  BookImportComponent,
} from '@core/components/book';
import {
  AdminCreateComponent,
  BlankPageComponent,
  CartAdminComponent,
  CartComponent,
  CheckoutComponent,
  ClientCreateComponent,
  InventoryReportComponent,
  LandingComponent,
  LayoutAdminComponent,
  LoginComponent,
  OrderDetailsComponent,
  OrderSummaryComponent,
} from '@core/components';
import { AdminGuard } from './guards/admin.guard';
import { ADMIN_CREATE, BLANK_PAGE, BOOK_CREATE, BOOK_DETAIL, BOOK_EXPORT, BOOK_IMPORT, CART, CATALOGUE, CHECKOUT, CLIENT_CREATE, HOME, LOGIN, ORDER_SUMMARY } from '@shared/constants';

const routes: Routes = [
  { path: '', redirectTo: LOGIN, pathMatch: 'full' },
  { path: CATALOGUE, redirectTo: HOME, pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: BOOK_DETAIL, component: BookDetailComponent },
      { path: BLANK_PAGE, component: BlankPageComponent },
      { path: HOME, component: BookCatalogueComponent },
      { path: CLIENT_CREATE, component: ClientCreateComponent },
      { path: LOGIN, component: LoginComponent },
      {
        path: 'checkout',
        component: CheckoutComponent,
        children: [
          { path: '', redirectTo: 'cart', pathMatch: 'full' },
          { path: 'cart', component: CartComponent },
          { path: 'delivery-options', component: OrderDetailsComponent },
          { path: 'payment', component: OrderDetailsComponent },
        ],
      },
    ],
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'style-template', component: StyleTemplateComponent },
      { path: BOOK_CREATE, component: BookCreateComponent },
      { path: BOOK_DETAIL, component: BookDetailComponent },
      { path: BOOK_IMPORT, component: BookImportComponent },
      { path: BOOK_EXPORT, component: InventoryReportComponent },
      { path: BLANK_PAGE, component: BlankPageComponent },
      { path: CATALOGUE, component: BookCatalogueComponent },
      { path: HOME, component: LandingComponent },
      { path: ADMIN_CREATE, component: AdminCreateComponent },
      { path: '', redirectTo: HOME, pathMatch: 'full' }, // Default admin route
      {
        path: CHECKOUT,
        component: CheckoutComponent,
        children: [
          { path: '', redirectTo: CART, pathMatch: 'full' },
          { path: CART, component: CartAdminComponent },
          { path: ORDER_SUMMARY, component: OrderSummaryComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
