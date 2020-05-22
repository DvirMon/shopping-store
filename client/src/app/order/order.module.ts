import { NgModule } from '@angular/core';
import { SharedModule } from '../share-components/shared-components.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../share-modules/core.module';
import { OrderComponent } from './components/order/order.component';
import { OrderRoutingModule } from './order-routing.module';



@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
