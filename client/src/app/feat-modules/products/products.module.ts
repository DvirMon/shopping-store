import { NgModule } from '@angular/core';

import { CoreModule } from '../../share-modules/core.module';
import { SharedModule } from '../../share-components/shared-components.module';
import { ProductsRoutingModule } from './products-routing.module';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

import { CartModule } from '../cart/cart.module';

import { RootComponent } from './components/root/root.component';

import { ProductsBarComponent } from './components/products-bar/products-bar.component';
import { ProductsNavComponent } from './components/products-nav/products-nav.component';
import { ProductsSidenavComponent } from './components/products-sidenav/products-sidenav.component';

import { ProductsDashboardComponent } from './components/products-dashbord/products-dashbord.component';
import { ProductsItemComponent } from './components/products-item/products-item.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';

import { ProductBannerComponent } from './components/product-banner/product-banner.component';

@NgModule({
  declarations: [
    RootComponent,
    ProductsBarComponent,
    ProductsItemComponent,

    ProductsFormComponent,

    ProductsNavComponent,
    ProductsSidenavComponent,
    ProductsDashboardComponent,
    ProductBannerComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    CartModule,
    ProductsRoutingModule,
    VirtualScrollerModule,
  ],
  exports: [RootComponent, ProductsBarComponent, ProductsItemComponent],
})
export class ProductsModule {}
