import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SearchPipe } from './product-list/search.pipe';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductEditComponent } from './product-edit/product-edit.component';



@NgModule({
  declarations: [ProductComponent, ProductListComponent, SearchPipe, ProductDetailComponent, CreateProductComponent, ProductEditComponent],
  imports: [
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ThemeModule,
    FormsModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    CommonModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
