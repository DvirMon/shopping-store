import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../share-modules/core.module';
import { SharedModule } from '../share-components/shared-components.module';
import { ProductsRoutingModule } from './products-routing.module';

import { CartModule } from '../cart/cart.module';

import { RootComponent } from './components/root/root.component';
import { ProductsBarComponent } from './components/products-bar/products-bar.component';

import { ProductsItemComponent } from './components/products-item/products-item.component';
import { ProductsDialogComponent } from './components/products-dialog/products-dialog.component';

import { ProductsNavComponent } from './components/products-nav/products-nav.component';
import { ProductsSidenavComponent } from './components/products-sidenav/products-sidenav.component'

import { ProductsFormComponent } from './components/products-form/products-form.component';



@NgModule({
  declarations: [

    RootComponent,
    ProductsBarComponent,
    ProductsItemComponent,

    ProductsDialogComponent,
    ProductsFormComponent,

    ProductsNavComponent,
    ProductsSidenavComponent
    // ProductsNavListComponent,

  ],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
    CartModule,
    ProductsRoutingModule
  ],
  exports: [
    RootComponent,
    ProductsBarComponent,
    ProductsItemComponent,
    ProductsDialogComponent,
  ]
})
export class ProductsModule { }
