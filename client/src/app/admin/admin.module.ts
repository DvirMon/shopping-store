import { NgModule } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../share-modules/shared.module';

import { AdminComponent } from './components/admin/admin.component';
import { AdminBarComponent } from './components/admin-bar/admin-bar.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    AdminComponent,
    AdminBarComponent],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
    AdminRoutingModule
  ],
  exports: [
  ]
})
export class AdminModule { }
