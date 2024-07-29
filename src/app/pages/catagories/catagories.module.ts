import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CatagoriesComponent } from '../catagories/catagories.component';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { CategoryListComponent } from './category-list/category-list.component';

import { CatagoriesRoutingModule } from './catagories-routing.module';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';


@NgModule({
 
  declarations: [ CategoryListComponent, CatagoriesComponent, CreateCategoryComponent, UpdateCategoryComponent],
  imports: [
    CatagoriesRoutingModule,
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
  ],
  bootstrap: [CatagoriesComponent]
})
export class CatagoriesModule { }
