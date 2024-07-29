import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsCreateComponent } from './events-create/events-create.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsUpdateComponent } from './events-update/events-update.component';
import { EventsComponent } from './events.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [
      { path: 'events-list', component: EventsListComponent},
      { path: 'add', component: EventsCreateComponent},
      { path: 'add', component: EventsCreateComponent},
      { path: 'update/:id', component: EventsUpdateComponent,},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
