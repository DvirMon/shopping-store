import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { OrderResolver } from '../utilities/resolvers/order-resolver.service'



const routes: Routes = [
  { path: "", component: OrderComponent, resolve: { dates: OrderResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
