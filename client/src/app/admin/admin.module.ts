import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../share-modules/core.module';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../share-modules/shared.module';

import { AdminComponent } from './admin/admin.component';
import { BarAdminComponent } from './bar-admin/bar-admin.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    AdminComponent,
    BarAdminComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    SharedModule,
    AdminRoutingModule
  ],
  exports: [
  ]
})
export class AdminModule { }
