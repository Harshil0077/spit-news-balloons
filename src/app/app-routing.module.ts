import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExtraOptions,  Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { CartComponent } from './cart/cart.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AllProductComponent } from './all-product/all-product.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';


export const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },

  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  { 
    path: 'admin', component: AdminLoginComponent,
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu-tab/menu-tab.module')
      .then(m => m.MenuTabModule),
  },
  {
    path: 'card',
    loadChildren: () => import('./manage-card/manage-card.module')
      .then(m => m.ManageCardModule),
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'view/:id', component: ProductDetailComponent
  },
  {
    path: 'all-product', component: AllProductComponent
  },
  {
    path: 'cart/:id', component: CartComponent
  },
  {
    path: 'profile-detail', component: ProfileViewComponent
  },  
  {
    path: 'profile-update', component: ProfileUpdateComponent
  },
  {
    path: 'reset-password', component: ResetPasswordComponent
  },  
  {
    path: 'send-email', component: SendEmailComponent
  },
  {
    path: 'thank-you', component: ThankYouComponent
  },
  {
    path: 'order-list', component: OrderListComponent
  },
  {
    path: 'order-detail/:id', component: OrderDetailComponent
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
