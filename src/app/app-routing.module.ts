import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import your components for routing
import { StyleTemplateComponent } from './style-template/style-template.component';
import { LayoutComponent } from '@core/components/layout/layout.component';
import { BookCreateComponent, BookDetailComponent } from '@core/components/book';

const routes: Routes = [
  { path: '', redirectTo: 'style-template', pathMatch: 'full'},
  { path: '', component: LayoutComponent,
    children: [
      {
        path: 'style-template',
        component: StyleTemplateComponent
      },
      { path: 'book-create', component: BookCreateComponent },
      { path: 'book-detail', component: BookDetailComponent },
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
