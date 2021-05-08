import { NgModule } from '@angular/core';

import { CoreModule } from '../share-modules/core.module';
import { SharedModule } from '../share-components/shared-components.module';
import { MenuRoutingModule } from './menu-routing.module';

import { RootComponent } from './components/root/root.component';
import { BarComponent } from './components/bar/bar.component';
import { MenuDashbordComponent } from './components/menu-dashbord/menu-dashbord.component';
import { MenuToolbarComponent } from './components/menu-toolbar/menu-toolbar.component';
import { MenuAccountSidenavComponent } from './components/menu-account-sidenav/menu-account-sidenav.component';



@NgModule({
  declarations: [
    RootComponent,
    BarComponent,
    MenuDashbordComponent,
    MenuToolbarComponent,
    MenuAccountSidenavComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    MenuRoutingModule,
  ]
})
export class MenuModule { }
