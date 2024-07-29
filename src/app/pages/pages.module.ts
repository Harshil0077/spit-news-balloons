import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ThemeModule } from '../@theme/theme.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { CustomerComponent } from './customer/customer.component';
import { SearchPipe } from './customer/search.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FormsModule , 
    ReactiveFormsModule,
    NbChatModule,
    NbDatepickerModule,
    NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbToastrModule,
    NbWindowModule,
    ThemeModule,
    PagesRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    PagesComponent,
    CustomerComponent,
    SearchPipe,
  ],
 
})
export class PagesModule {

}
