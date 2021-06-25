import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderResolver } from '../utilities/resolvers/order-resolver.service'

import { OrderComponent } from './components/root/order.component';
import { OrdersHistoryComponent } from './components/orders-history/orders-history.component';
import { OrderPaymentStripComponent } from './components/order-payment-strip/order-payment-strip.component';



const routes: Routes = [

  {
    path: "history",
    component: OrdersHistoryComponent
  },
  {
    path: ":cartId",
    component: OrderComponent,
    resolve: { dates: OrderResolver } 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
