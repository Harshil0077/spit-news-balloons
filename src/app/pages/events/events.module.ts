import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsCreateComponent } from './events-create/events-create.component';
import { EventsUpdateComponent } from './events-update/events-update.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrdersRoutingModule } from '../orders/orders-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [EventsComponent, EventsListComponent, EventsCreateComponent, EventsUpdateComponent],
  imports: [
    NgMultiSelectDropDownModule,
    CommonModule,
    EventsRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    OrdersRoutingModule,
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
  ]
})
export class EventsModule { }
