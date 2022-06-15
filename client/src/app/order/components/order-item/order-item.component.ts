import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistoryModel } from 'src/app/order/components/order-form/order-model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() public order: OrderHistoryModel = new OrderHistoryModel()
  @Input() public isMobile$ : Observable<boolean>

  constructor() { }

  ngOnInit(): void {
  }

}
