import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../share-modules/core.module';
import { SharedModule } from '../share-components/shared-components.module';
import { ProductsRoutingModule } from './products-routing.module';

import { ProductsComponent } from './components/products/products.component';
import { ProductsBarComponent } from './components/products-bar/products-bar.component';
import { ProductsItemComponent } from './components/products-item/products-item.component';
import { ProductsDialogComponent } from './components/products-dialog/products-dialog.component';
import { CartModule } from '../cart/cart.module';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductsBarComponent,
    ProductsItemComponent,
    ProductsDialogComponent,
    
  ],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
    CartModule,
    ProductsRoutingModule
  ],
  exports: [
  ]
})
export class ProductsModule { }
