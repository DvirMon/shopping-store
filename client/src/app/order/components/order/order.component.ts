import { Component, OnInit, Inject } from '@angular/core';
import { OrderModel } from 'src/app/utilities/models/order-model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(
    @Inject(OrderModel) public order: OrderModel
  ) { }

  ngOnInit(): void {

  }

}
