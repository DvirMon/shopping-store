import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StripeCardComponent, StripeService } from 'ngx-stripe';

// MODELS
import { OrderHistoryModel, OrderModel } from '../utilities/models/order-model';

// SERVICES
import { CartService } from './cart.service';
import { DialogService } from './dialog.service';
import { ReceiptService } from './receipt.service';
import { AuthService } from './auth.service';

// RXJS
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

// NGRX
import { Store } from '@ngrx/store';
import { OrderState } from '../utilities/ngrx/state/orders.state';
import { historySelector, yearsSelector } from '../utilities/ngrx/selectors';
import * as  OrderActions from '../utilities/ngrx/actions/order-action';

// ENVIROMENT
import { environment } from 'src/environments/environment';
import { UserModel } from '../utilities/models/user.model';
import { SearchService } from './search.service';
import { UntypedFormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public url: string = `${environment.server}/api/orders`;

  public orderState$: Observable<OrderState> = this.store.select('order');

  public ordersHistory$: Observable<OrderHistoryModel[]> = this.store.select(historySelector);
  public years$: Observable<number[]> = this.store.select(yearsSelector);

  private ordersSearchEntries = new BehaviorSubject<OrderHistoryModel[]>([]);
  public orderEntries$: Observable<OrderHistoryModel[]> = this.ordersSearchEntries.asObservable()

  private user: UserModel = this.authService.auth.user

  constructor(
    private http: HttpClient,

    private cartService: CartService,
    private dialogService: DialogService,
    private searchService: SearchService,
    private authService: AuthService,
    private receiptService: ReceiptService,

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
        // this.formService.handleStore(ActionType.GetOrderData, order)
        this.store.dispatch(new OrderActions.AddOrder(order))
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

  // Get request - get search orders
  private searchOrders(query: string): Observable<OrderHistoryModel[]> {
    return this.http.get<OrderHistoryModel[]>(this.url + `/search/${this.user._id}/${query}`)
  }


  public checkout(stripeService : StripeService) {
    // Check the server.js tab to see an example implementation
    this.http.post(this.url + '/checkout', {})
      .pipe(
        switchMap((id: string) => {
          console.log(id)
          return stripeService.redirectToCheckout({ sessionId: id })
        })
      )
      .subscribe((result: any) => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        console.log(result);
        if (result.error) {
          console.log(result.error.message);
        }
      });
  }

  public createToken(stripeService : StripeService, name: string, card: StripeCardComponent): void {

    stripeService
      .createToken(card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error);
          console.log(result.error.message);
        }
      });
  }



  // LOGIC SECTION

  public search(control: UntypedFormControl): Observable<OrderHistoryModel[]> {

    return this.searchService.search(control).pipe(
      switchMap((query: string) => {

        if (!query) {
          this.clearResults()
          return of([])
        }

        return this.searchOrders(query).pipe(
          tap((orders: OrderHistoryModel[]) => {

            if (orders.length === 0) {
              return this.handleError()
            }
            return this.handleSuccess(orders)
          })
        )
      }))
  }

  private isLeapYear(): boolean {
    const date = new Date()
    const year = date.getFullYear()
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }

  // handle search error
  private handleError(): Observable<[]> {
    this.searchService.handlerRsults.next(true)
    this.clearResults()
    return of([]);
  }

  private handleSuccess(orders: OrderHistoryModel[]): Observable<OrderHistoryModel[]> {
    this.searchService.handlerRsults.next(false)
    this.ordersSearchEntries.next(orders);
    return of(orders)

  }

  public clearResults() {
    this.ordersSearchEntries.next([]);
  }


  // end of logic section





}
