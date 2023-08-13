import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import your components for routing
import { StyleTemplateComponent } from './style-template/style-template.component';
import { LayoutComponent } from '@core/components/layout/layout.component';
import { BookCatalogueComponent, BookCreateComponent, BookDetailComponent } from '@core/components/book';
import { BlankPageComponent, CartAdminComponent, CartComponent, CheckoutComponent, LandingComponent, LoginComponent, OrderDetailsComponent, OrderSummaryComponent, UserCreateComponent } from '@core/components';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'book-detail/:id', component: BookDetailComponent },
            { path: 'blank', component: BlankPageComponent },
            { path: 'home', component: BookCatalogueComponent },
            { path: 'register', component: UserCreateComponent },
            { path: 'login', component: LoginComponent},
            { path: 'checkout', component: CheckoutComponent, children: [
                { path: '', redirectTo: 'cart', pathMatch: 'full' },
                { path: 'cart', component: CartComponent },
                { path: 'delivery-options', component: OrderDetailsComponent },
                { path: 'payment', component: OrderDetailsComponent }
              ]},
        ]
    },
    {
        path: 'admin',
        component: LayoutComponent,
        canActivate: [AdminGuard],
        children: [
          { path: 'style-template', component: StyleTemplateComponent },
          { path: 'book-create', component: BookCreateComponent },
          { path: 'book-detail/:id', component: BookDetailComponent },
          { path: 'blank', component: BlankPageComponent },
          { path: 'catalog', component: BookCatalogueComponent },
          { path: 'home', component: LandingComponent},
          { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default admin route
          { path: 'checkout', component: CheckoutComponent, children: [
            { path: '', redirectTo: 'cart', pathMatch: 'full' },
            { path: 'cart', component: CartAdminComponent },
            { path: 'order-summary', component: OrderSummaryComponent },]}
        ]
      },


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
