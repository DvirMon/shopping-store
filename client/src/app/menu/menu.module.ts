import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './components/root/root.component';
import { BarComponent } from './components/bar/bar.component';
import { CoreModule } from '../share-modules/core.module';
import { SharedModule } from '../share-components/shared-components.module';
import { MenuRoutingModule } from './menu-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MenuDashbordComponent } from './components/menu-dashbord/menu-dashbord.component';



@NgModule({
  declarations: [
    RootComponent,
    BarComponent,
    MenuDashbordComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    MenuRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ]
})
export class MenuModule { }
