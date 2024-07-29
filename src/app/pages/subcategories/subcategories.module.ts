import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategoriesRoutingModule } from './subcategories-routing.module';
import { SubcategoriesComponent } from '../subcategories/subcategories.component';
import { CreateSubcategoryComponent } from './create-subcategory/create-subcategory.component';
import { UpdateSubcategoryComponent } from './update-subcategory/update-subcategory.component';
import { SubcategoryListComponent } from './subcategory-list/subcategory-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { SearchPipe } from './subcategory-list/search.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [ SubcategoriesComponent, CreateSubcategoryComponent, UpdateSubcategoryComponent, SubcategoryListComponent, SearchPipe],
  imports: [
    Ng2SearchPipeModule,
    NgxPaginationModule,
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
    SubcategoriesRoutingModule
  ]
})
export class SubcategoriesModule { }
