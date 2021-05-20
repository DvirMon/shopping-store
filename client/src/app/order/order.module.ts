import { NgModule } from '@angular/core';
import { SharedModule } from '../share-components/shared-components.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../share-modules/core.module';
import { CartModule } from '../cart/cart.module';

import { OrderComponent } from './components/root/order.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';

import { DateInputComponent } from './components/date-input/date-input.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { OrderNavComponent } from './components/order-nav/order-nav.component';

import { OrdersHistoryComponent } from './components/orders-history/orders-history.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderProductComponent } from './components/order-product/order-product.component';
import { OrderSearchComponent } from './components/order-search/order-search.component';


@NgModule({
  declarations: [
    OrderComponent,
    OrderFormComponent,
    OrderDialogComponent,

    OrderItemComponent,
    OrdersHistoryComponent,

    DateInputComponent,
    CreditCardComponent,
    OrderNavComponent,
    OrderProductComponent,
    OrderSearchComponent,
  ],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
    OrderRoutingModule,
    CartModule,
  ]
})
export class OrderModule { }
