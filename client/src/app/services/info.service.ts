import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { forkJoin, from } from 'rxjs'
import { tap, switchMap, take, map } from 'rxjs/operators'

export interface Cart {
  _id: string,
  isActive: boolean,
  createDate: Date
}



@Injectable({
  providedIn: 'root'
})

export class InfoService {

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
          return of({ message: "new client" })
        }
        if (cart.isActive) {
          return this.http.get(`http://localhost:3000/api/cart-items/${cart._id}`).pipe(
            map(currentCartPrice => {
              cart.currentCartPrice = currentCartPrice
              return cart
            })
          )
        }
        return this.http.get(`http://localhost:3000/api/orders/latest/${cart._id}`)
      })
    )

  }



}
