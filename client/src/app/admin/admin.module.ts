import { NgModule } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../share-components/shared-components.module';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductsModule } from '../products/products.module';




@NgModule({
  declarations: [
  ],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
    AdminRoutingModule,
    ProductsModule,

  ],
  exports: [
  ]
})
export class AdminModule { }
