import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './components/root/order.component';
import { OrderResolver } from '../utilities/resolvers/order-resolver.service'



const routes: Routes = [

  {
    path: "  :userId/:cartId",
    component: OrderComponent,
    resolve: { dates: OrderResolver }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
