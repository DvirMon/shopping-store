import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderHistoryModel } from 'src/app/utilities/models/order-model';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})
export class OrdersHistoryComponent implements OnInit {


  public orders$: Observable<OrderHistoryModel[]>

  public isMobile$ : Observable<boolean> = this.formService.isMobile()

  public slectStates: [

  ]

  constructor(
    private orderServcie: OrderService,
    private authService: AuthService,
    private formService : FormService
  ) { }

  ngOnInit(): void {
    this.getOrdersHistory()
  }

  private getOrdersHistory() {
    this.orders$ = this.orderServcie.getOrdersHistory(this.authService.auth.user._id)
  }

}
