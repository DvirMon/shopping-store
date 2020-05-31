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
import { ProductsNavComponent } from './components/products-nav/products-nav.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductsBarComponent,
    ProductsItemComponent,
    ProductsDialogComponent,
    ProductsNavComponent,
    ProductsFormComponent,

  ],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
    CartModule,
    ProductsRoutingModule
  ],
  exports: [
    ProductsComponent,
    ProductsBarComponent,
    ProductsItemComponent,
    ProductsDialogComponent,
  ]
})
export class ProductsModule { }
