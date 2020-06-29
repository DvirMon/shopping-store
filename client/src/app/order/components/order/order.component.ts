import { Component, Inject } from '@angular/core';
import { OrderModel } from 'src/app/utilities/models/order-model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  public hide: boolean;

  constructor(
    @Inject(OrderModel) public order: OrderModel,

  ) { }



}
