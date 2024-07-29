import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ProductComponent } from './product/product.component';
import { MatCardModule } from "@angular/material/card";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FooterComponent } from './footer/footer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PagesModule } from './pages/pages.module';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { NbDatepickerModule, NbDialogModule, NbMenuModule, NbSidebarModule, NbToastrModule, NbWindowModule } from '@nebular/theme';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RestAPIInterceptor } from './core_auth/inerceptor/rest.api.Interceptor';
import {NgxImageCompressService} from 'ngx-image-compress';
import { AllProductComponent } from './all-product/all-product.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { CommonModule } from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';
import { SendEmailComponent } from './send-email/send-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent,
    ResetPasswordComponent,
    SendEmailComponent,
    ProfileViewComponent,
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductComponent,
    FooterComponent,
    ProductDetailComponent,
    CartComponent,
    DatepickerComponent,
    AdminLoginComponent,
    AllProductComponent,
    ProfileUpdateComponent,
    ThankYouComponent
  ],
  imports: [
    NgxPaginationModule,
    TranslateModule.forRoot(),
    CommonModule,
    NbThemeModule,
    PagesModule,
    NgMultiSelectDropDownModule,
    MatInputModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    MatCardModule,
    AppRoutingModule,
    MatSliderModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately'
    }),
  ],
  exports: [],
  providers: [NgxImageCompressService, { provide: HTTP_INTERCEPTORS, useClass: RestAPIInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
