import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatagoriesComponent } from './catagories.component';
import { CategoryListComponent } from '../catagories/category-list/category-list.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';

const routes: Routes = [{
  path: '',
  component: CatagoriesComponent,
  children: [
      { path: 'category-list', component: CategoryListComponent},
      { path: 'add', component: CreateCategoryComponent},
      { path: 'update/:id', component: UpdateCategoryComponent,}
  ],
  
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatagoriesRoutingModule {
  
 }

export const routedComponents = [
   CatagoriesComponent,
];
