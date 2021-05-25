import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// MODELS
import { OrderHistoryModel, OrderModel } from '../utilities/models/order-model';

// SERVICES
import { CartService } from './cart.service';
import { DialogService } from './dialog.service';
import { FormService } from './form.service';
import { ReceiptService } from './receipt.service';
import { AuthService } from './auth.service';

// RXJS
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

// NGRX
import { Store } from '@ngrx/store';
import { OrderState } from '../utilities/ngrx/state/orders.state';
import { ActionType } from '../utilities/redux/action-type';
import { hisotrySelecotr, yearsSelecotr } from '../utilities/ngrx/selectors';
import * as  OrderActions from '../utilities/ngrx/actions/order-action';

// ENVIROMENT
import { environment } from 'src/environments/environment';
import { UserModel } from '../utilities/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public url: string = `${environment.server}/api/orders`;

  public orderState$: Observable<OrderState> = this.store.select('order');

  public ordersHistory$: Observable<OrderHistoryModel[]> = this.store.select(hisotrySelecotr);
  public years$: Observable<number[]> = this.store.select(yearsSelecotr);

  private user: UserModel = this.authService.auth.user

  constructor(
    private http: HttpClient,

    private cartService: CartService,
    private dialogService: DialogService,
    private receiptService: ReceiptService,
    private formService: FormService,
    private authService: AuthService,

    private store: Store<{ order: OrderState }>

  ) {

  }

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
        return this.cartService.deactivateCart(order.cartRef)
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

  // GET request - order occupied dates : http://localhost:3000/api/orders/history/:userId/:days
  public getOrdersHistory(date: number) {
    this.http.get<OrderHistoryModel[]>(this.url + `/history/${this.user._id}/${date}`)
      .subscribe(
        (history: OrderHistoryModel[]) => {
          this.store.dispatch(new OrderActions.SetHistory(history))
        })
  }

  // GET request - get order history years : http://localhost:3000/api/orders/years/:userId
  public getOrdersYeras() {
    this.http.get<number[]>(this.url + `/years/${this.user._id}`)
      .subscribe(
        (years: number[]) => {
          this.store.dispatch(new OrderActions.SetYears(years))

        }
      )

  }

  // LOGIC SECTION

  private isLeapYear(): boolean {
    const date = new Date()
    const year = date.getFullYear()
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }

  // end of logic section





}
