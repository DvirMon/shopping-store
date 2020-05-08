import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../share-modules/core.module';
import { SharedModule } from '../share-modules/shared.module';

import { ProductsComponent } from './products/products.component';



@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    SharedModule
  ],
  exports : [
  ]})
export class ProductsModule { }
