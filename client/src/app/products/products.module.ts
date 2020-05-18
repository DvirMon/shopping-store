import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../share-modules/core.module';
import { SharedModule } from '../share-modules/shared.module';

import { ProductsComponent } from './components/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsBarComponent } from './components/products-bar/products-bar.component';
import { ProductsItemComponent } from './components/products-item/products-item.component';
import { ProductsDialogComponent } from './components/products-dialog/products-dialog.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductsBarComponent,
    ProductsItemComponent,
    ProductsDialogComponent],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
    ProductsRoutingModule
  ],
  exports: [
  ]
})
export class ProductsModule { }
