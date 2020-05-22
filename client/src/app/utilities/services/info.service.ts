import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { forkJoin } from 'rxjs'
import { switchMap, take, map } from 'rxjs/operators'
import { FormService } from './form.service';
import { ActionType } from '../../redux/action-type';
import { CartItemModel } from '../models/cart-item-model';
import { CartModel } from '../models/cart-model';


export interface Info {
  message: string,
  messageDate: string,
  messagePrice: string,
  date: Date,
  price: number
}

interface CurrentCart {
  price : number,
  cartItems : CartItemModel[]
}

@Injectable({
  providedIn: 'root'
})

export class InfoService {

  public info: Info;

  constructor(

    private http: HttpClient,
    private formService: FormService
  ) { }

  // request section

  // get total store products and orders
  public getStoreInfo(): Observable<number[]> {
    let products = this.http.get<number>("http://localhost:3000/api/products/total")
    let orders = this.http.get<number>("http://localhost:3000/api/orders/total")
    return forkJoin([products, orders]);
  }

  public getNotification(userId) {

    return this.http.get<CartModel>(`http://localhost:3000/api/carts/latest/${userId}`).pipe(
      take(1),
      switchMap(cart => {
        if (cart === null) {
          const info = { ...this.info }
          info.message = "new client"
          return of(info)
        }
        this.formService.handleStore(ActionType.IsCartActive, cart.isActive)
        
        if (cart.isActive) {

          this.formService.handleStore(ActionType.AddCart, cart)

          return this.http.get<CurrentCart>(`http://localhost:3000/api/cart-item/${cart._id}`).pipe(
            map((response : CurrentCart) => {
              this.formService.handleStore(ActionType.SetCartItems, response.cartItems)
              this.formService.handleStore(ActionType.SetCartPrice, response.price)
              return this.handleCartData(cart, response.price)
            })
          )
        }
        return this.http.get<any>(`http://localhost:3000/api/orders/latest/${cart._id}`).pipe(
          take(1),
          map(order => {
            const info = this.handleOrderData(order)
            return info
          })
        )
      })
    )

  }

  private handleCartData(cart, price): Info {
    const info: Info = {
      message: "",
      messageDate: "You have Open Cart from",
      date: cart.createDate,
      messagePrice: "Your current cart price is",
      price: price,
    }
    return info
  }

  private handleOrderData(order): Info {
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
