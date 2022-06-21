import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { OrderComponent } from './components/root/order.component';
import { OrdersHistoryComponent } from './components/orders-history/orders-history.component';
import { OrderResolver } from 'src/app/utilities/resolvers/order-resolver.service';



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
