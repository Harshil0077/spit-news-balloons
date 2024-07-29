import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuTabRoutingModule } from './menu-tab-routing.module';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChangepasswordComponent,  MyProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuTabRoutingModule
  ]
})
export class MenuTabModule { }
