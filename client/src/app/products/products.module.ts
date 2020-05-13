import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../share-modules/core.module';
import { SharedModule } from '../share-modules/shared.module';

import { ProductsComponent } from './products/products.component';
import { ProductsRoutingModule } from './products-routing.module';



@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
    ProductsRoutingModule
  ],
  exports : [
  ]})
export class ProductsModule { }
