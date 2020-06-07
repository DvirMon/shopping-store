import { NgModule } from '@angular/core';
import { SharedModule } from '../share-components/shared-components.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../share-modules/core.module';
import { CartModule } from '../cart/cart.module';

import { OrderComponent } from './components/order/order.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';

import { DateInputComponent } from './components/date-input/date-input.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';



@NgModule({
  declarations: [
    OrderComponent,
    OrderFormComponent,
    OrderDialogComponent,
    DateInputComponent,
    CreditCardComponent,
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
