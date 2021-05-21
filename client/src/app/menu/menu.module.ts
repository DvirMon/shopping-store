import { NgModule } from '@angular/core';

import { CoreModule } from '../share-modules/core.module';
import { SharedModule } from '../share-components/shared-components.module';
import { MenuRoutingModule } from './menu-routing.module';
import { CartModule } from '../cart/cart.module';

import { RootComponent } from './components/root/root.component';
import { BarComponent } from './components/bar/bar.component';

import { MenuDashbordComponent } from './components/menu-dashbord/menu-dashbord.component';
import { MenuTopComponent } from './components/menu-top/menu-top.component';
import { MenuBottomComponent } from './components/menu-bottom/menu-bottom.component';

import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { LastPurchaseComponent } from './components/last-purchase/last-purchase.component';
import { AccountItemComponent } from './components/account-item/account-item.component';



@NgModule({
  declarations: [
    RootComponent,
    BarComponent,
    MenuDashbordComponent,
    MenuTopComponent,
    AccountComponent,
    CartComponent,
    LastPurchaseComponent,
    MenuBottomComponent,
    AccountItemComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    MenuRoutingModule,
    CartModule
  ]
})
export class MenuModule { }
