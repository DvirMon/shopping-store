import { NgModule } from '@angular/core';

import { CoreModule } from '../share-modules/core.module';
import { SharedModule } from '../share-components/shared-components.module';
import { MenuRoutingModule } from './menu-routing.module';

import { RootComponent } from './components/root/root.component';
import { BarComponent } from './components/bar/bar.component';
import { MenuDashbordComponent } from './components/menu-dashbord/menu-dashbord.component';
import { MenuToolbarComponent } from './components/menu-toolbar/menu-toolbar.component';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { CartModule } from '../cart/cart.module';
import { LastPurchaseComponent } from './components/last-purchase/last-purchase.component';



@NgModule({
  declarations: [
    RootComponent,
    BarComponent,
    MenuDashbordComponent,
    MenuToolbarComponent,
    AccountComponent,
    CartComponent,
    LastPurchaseComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    MenuRoutingModule,
    CartModule
  ]
})
export class MenuModule { }
