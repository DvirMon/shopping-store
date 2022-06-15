import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CartModule } from '../cart/cart.module';
import { CoreModule } from '../../share-modules/core.module';
import { SharedModule } from '../../share-components/shared-components.module';

import { NgxStripeModule } from 'ngx-stripe';

import { OrderComponent } from './components/root/order.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';

import { DateInputComponent } from './components/date-input/date-input.component';
import { OrderPaymentComponent } from './components/order-payment/order-payment.component';
import { OrderNavComponent } from './components/order-nav/order-nav.component';

import { OrdersHistoryComponent } from './components/orders-history/orders-history.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderProductComponent } from './components/order-product/order-product.component';
import { OrderSearchComponent } from './components/order-search/order-search.component';
import { OrderPaymentStripComponent } from './components/order-payment-strip/order-payment-strip.component';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    OrderComponent,
    OrderFormComponent,
    OrderDialogComponent,

    OrderItemComponent,
    OrdersHistoryComponent,

    DateInputComponent,
    OrderPaymentComponent,
    OrderNavComponent,
    OrderProductComponent,
    OrderSearchComponent,
    OrderPaymentStripComponent,
  ],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
    OrderRoutingModule,
    CartModule,
    NgxStripeModule.forRoot(environment.stripeApi)
  ]
})
export class OrderModule { }
