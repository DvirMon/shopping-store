import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../share-modules/core.module';
import { MaterialModule } from '../share-modules/material.module';

import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { ProductsComponent } from './products/products.component';



@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    MaterialModule,
    CustomComponentsModule
  ],
  exports : [
  ]})
export class ProductsModule { }
