import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSubcategoryComponent } from './create-subcategory/create-subcategory.component';
import { SubcategoriesComponent } from './subcategories.component';
import { SubcategoriesModule } from './subcategories.module';
import { SubcategoryListComponent } from './subcategory-list/subcategory-list.component';
import { UpdateSubcategoryComponent } from './update-subcategory/update-subcategory.component';

const routes: Routes = [
  {
    path: '',
    component: SubcategoriesComponent,
    children: [
        { path: 'subcategory-list', component: SubcategoryListComponent},
        { path: 'add', component: CreateSubcategoryComponent},
        { path: 'update/:id', component: UpdateSubcategoryComponent,},
    ],
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcategoriesRoutingModule { }
