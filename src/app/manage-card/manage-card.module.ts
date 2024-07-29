import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCardRoutingModule } from './manage-card-routing.module';
import { CardListComponent } from './card-list/card-list.component';
import { AddCardComponent } from './add-card/add-card.component';


@NgModule({
  declarations: [CardListComponent, AddCardComponent],
  imports: [
    CommonModule,
    ManageCardRoutingModule
  ]
})
export class ManageCardModule { }
