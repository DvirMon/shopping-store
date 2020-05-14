import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { forkJoin } from 'rxjs'
import { switchMap, take, map } from 'rxjs/operators'


export interface Info {
  message: string,
  messageDate: string,
  messagePrice: string,
  date: Date,
  price: number
}

@Injectable({
  providedIn: 'root'
})

export class InfoService {

  public info: Info;

  constructor(

    private http: HttpClient
  ) { }

  // request section

  // get total store products and orders
  public getStoreInfo(): Observable<number[]> {
    let products = this.http.get<number>("http://localhost:3000/api/products/total")
    let orders = this.http.get<number>("http://localhost:3000/api/orders/total")
    return forkJoin([products, orders]);
  }

  public getNotification(userId) {

    return this.http.get<any>(`http://localhost:3000/api/carts/latest/${userId}`).pipe(
      take(1),
      switchMap(cart => {

        if (cart === null) {
          const info = { ...this.info }
          info.message = "new client"
          return of(info)
        }
        if (cart.isActive) {
          return this.http.get<number>(`http://localhost:3000/api/cart-items/${cart._id}`).pipe(
            map(currentCartPrice => {
              return this.handleCartData(cart, currentCartPrice)
            })
          )
        }
        return this.http.get<any>(`http://localhost:3000/api/orders/latest/${cart._id}`).pipe(
          map(order => {
            const info = this.handleOrderData(order)
            return info
          })
        )
      })
    )

  }

  private handleCartData(cart, price) {
    const info: Info = {
      message: "",
      messageDate: "You have Open Cart from",
      date: cart.createDate,
      messagePrice: "Your current cart price is",
      price: price,
    }
    return info
  }

  private handleOrderData(order) {
    const info: Info = {
      message: "",
      messageDate: "You Last Purchase was in",
      date: order.orderDate,
      messagePrice: "For",
      price: order.totalPrice,
    }
    return info
  }



}
