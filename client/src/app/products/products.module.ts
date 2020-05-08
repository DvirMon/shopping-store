import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../share-modules/core.module';
import { SharedModule } from '../share-modules/shared.module';

import { ProductsComponent } from './products/products.component';



@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule
  ],
  exports : [
  ]})
export class ProductsModule { }
