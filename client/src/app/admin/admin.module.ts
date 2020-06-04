import { NgModule } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../share-components/shared-components.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminProductsTableComponent } from './components/admin-products-table/admin-products-table.component';
import { AdminProductsFormComponent } from './components/admin-products-form/admin-products-form.component';
import { ProductsModule } from '../products/products.module';




@NgModule({
  declarations: [
    AdminProductsTableComponent,
    AdminProductsFormComponent,
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
