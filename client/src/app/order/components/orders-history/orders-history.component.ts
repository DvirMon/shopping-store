import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistoryModel } from 'src/app/utilities/models/order-model';

import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';
import { OrderService } from 'src/app/services/order.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})
export class OrdersHistoryComponent implements OnInit {


  public isMobile$: Observable<boolean>
  public orders$: Observable<OrderHistoryModel[]>
  public orderEntries$: Observable<OrderHistoryModel[]>

  public slectStates: [

  ]

  constructor(
    private orderServcie: OrderService,
    private authService: AuthService,
    private searchService: SearchService,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.isMobile$ = this.formService.isMobile()
    this.orders$ = this.orderServcie.getOrdersHistory(this.authService.auth.user._id)
    this.orderEntries$ = this.searchService.orderEntries$
  }

}
