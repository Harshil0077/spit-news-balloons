import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { CatagoriesModule } from './catagories/catagories.module'
import { CustomerComponent } from './customer/customer.component';
import { AuthGuard } from '../core_auth/auth/auth.guard';


const routes: Routes = [{
  path: 'pages',
  component: PagesComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'customer',
      component: CustomerComponent,
    },
    {
      path: 'orders',
      loadChildren: () => import('./orders/orders.module')
        .then(m => m.OrdersModule),
    },
    {
      path: 'catagories',
      loadChildren: () => import('./catagories/catagories.module')
        .then(m => m.CatagoriesModule),
    },
    {
      path: 'subcategories',
      loadChildren: () => import('./subcategories/subcategories.module')
        .then(m => m.SubcategoriesModule),
    },
    {
      path: 'events',
      loadChildren: () => import('./events/events.module')
        .then(m => m.EventsModule),
    },
    {
      path: 'product',
      loadChildren: () => import('./product/product.module')
        .then(m => m.ProductModule),
    },
    {
      path: '',
      redirectTo: 'pages/catagories/category-list',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
