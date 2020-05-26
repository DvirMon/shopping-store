import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderModel } from '../models/order-model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public baseUrl: string = "http://localhost:3000/api/orders"

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) { }


  public handleNewOrder(data: OrderModel) {
    this.http.post<OrderModel>(this.baseUrl, data).pipe(
      switchMap((order: OrderModel) => {
        return this.cartService.disActiveCart(order.cartId)
      }),
    ).subscribe(
      (response) => {
        console.log(response)
      }
    )
  }

  public getOccupiedDates(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + "/dates")
  }


}
