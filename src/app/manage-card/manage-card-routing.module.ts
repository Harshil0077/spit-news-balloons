import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCardComponent } from './add-card/add-card.component';
import { CardListComponent } from './card-list/card-list.component';

const routes: Routes = [
  {
    path: 'cardAdd', component: AddCardComponent
  },
  {
    path: 'cardList', component: CardListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCardRoutingModule { }
