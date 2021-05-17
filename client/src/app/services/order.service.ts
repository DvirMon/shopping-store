import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { OrderModel } from '../utilities/models/order-model';

import { CartService } from './cart.service';
import { DialogService } from './dialog.service';
import { FormService } from './form.service';
import { ReceiptService } from './receipt.service';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { ActionType } from '../utilities/redux/action-type';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {


  public url: string = `${environment.server}/api/orders`

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private dialogService: DialogService,
    private receiptService: ReceiptService,
    private formService: FormService,
  ) { }

  // GET request - total products in store : http://localhost:3000/api/orders/total
  public getTotalNumberOfOrders(): Observable<number> {
    return this.http.get<number>(this.url + "/total")
  }


  // POST request  - new order : http://localhost:3000/api/orders
  public handleNewOrder(data: OrderModel): void {
    this.http.post<OrderModel>(this.url, data).pipe(
      switchMap((order: OrderModel) => {
        this.formService.handleStore(ActionType.GetOrderData, order)
        this.receiptService.handleReceiptData()
        return this.cartService.deactivateCart(order.cartId)
      }),
    ).subscribe(
      () => {
        this.dialogService.handleOrderDialog()
      }
    )
  }
  // GET request - latest order : http://localhost:3000/api/orders/latset/:cartId

  public getLatestOrder(cartId: string): Observable<any> {
    return this.http.get<any>(this.url + `/latest/${cartId}`)
  }

  // GET request - order occupied dates : http://localhost:3000/api/orders/dates
  public getOccupiedDates(): Observable<number[]> {
    return this.http.get<number[]>(this.url + "/dates").pipe(
      map(dates => {

        if (this.isLeapYear()) {
          dates = dates.map(date => date + 1)
        }

        return dates

      })
    )
  }

  // end of request section

  // logic section

  private isLeapYear(): boolean {
    const date = new Date()
    const year = date.getFullYear()
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }

  // end of logic section





}
