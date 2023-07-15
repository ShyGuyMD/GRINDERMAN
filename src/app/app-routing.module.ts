import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import your components for routing
import { StyleTemplateComponent } from './style-template/style-template.component';
import { LayoutComponent } from '@core/components/layout/layout.component';
import { BookCatalogComponent, BookCreateComponent, BookDetailComponent } from '@core/components/book';
import { BlankPageComponent, LandingComponent } from '@core/components';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '', component: LayoutComponent,
    children: [
      { path: 'style-template', component: StyleTemplateComponent },
      { path: 'book-create', component: BookCreateComponent },
      { path: 'book-detail/:id', component: BookDetailComponent },
      { path: 'blank', component: BlankPageComponent },
      { path: 'catalog', component: BookCatalogComponent },
      { path: 'home', component: LandingComponent },
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
