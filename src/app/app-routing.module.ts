import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import your components for routing
import { StyleTemplateComponent } from './style-template/style-template.component';
import { LayoutComponent } from '@core/components/layout/layout.component';

const routes: Routes = [
  { path: '', 
    redirectTo: 'style-template',
    pathMatch: 'full'
  },
  { path: '', 
    component: LayoutComponent,
    children: [
      {
        path: 'style-template',
        component: StyleTemplateComponent
      }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
