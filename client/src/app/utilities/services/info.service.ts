import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { forkJoin } from 'rxjs'
import { switchMap, take, map } from 'rxjs/operators'

import { CartModel, CurrentCartModel } from '../models/cart-model';

import { OrderService } from './order.service';
import { CartService } from './cart.service';
import { ProductsService } from './products.service';
import { FormService } from './form.service';

import { ActionType } from 'src/app/utilities/redux/action-type';

export interface Info {
  new: boolean,
  messageDate: string,
  messagePrice: string,
  date: Date,
  price: number
}

@Injectable({
  providedIn: 'root'
})

export class InfoService {

  public loginInfo: Info;

  constructor(
    private formService: FormService,
    private orderService: OrderService,
    private cartService: CartService,
    private productsService: ProductsService
  ) { }

  // request section

  // get total store products and orders
  public getStoreInfo(): Observable<number[]> {
    const products = this.productsService.getTotalNumberOfProducts()
    const orders = this.orderService.getTotalNumberOfOrders()
    return forkJoin([products, orders]);
  }

  // get login information : new client, latest cart, latest order
  public getNotification(userId): Observable<Info> {

    return this.cartService.getLatestCart(userId).pipe(
      take(1),
      switchMap(cart => {
        if (cart === null) {
          return this.handleNewClient()
        }
        this.formService.handleStore(ActionType.IsCartActive, cart.isActive)

        if (cart.isActive) {
          return this.handleCurrentCart(cart)
        }
        return this.handleLatestOrder(cart)
      })
    )

  }

  // handle new client data
  private handleNewClient(): Observable<Info> {
    const loginInfo = { ...this.loginInfo }
    loginInfo.new = true
    return of(loginInfo)
  }

  // handle current cart data
  private handleCurrentCart(cart: CartModel): Observable<Info> {

    this.formService.handleStore(ActionType.AddCart, cart)

    return this.cartService.getLatestCartItems(cart._id).pipe(

      // get current cart products
      switchMap((response: CurrentCartModel) => {
        this.productsService.getProductOfCurrentCart(this.getProductsIds(response))
        return of(response)

      }),

      // save cart data in store and handle current cart data
      map((response: CurrentCartModel) => {
        this.formService.handleStore(ActionType.SetCartItems, response.cartItems)
        this.formService.handleStore(ActionType.SetCartPrice, response.price)
        return this.handleCartDataFormat(cart, response.price)
      }),
    )
  }


  private getProductsIds(response: CurrentCartModel): string[] {
    let productsIds: string[] = []
    response.cartItems.map(cartItem => productsIds.push(cartItem.productId))
    return productsIds
  }

  // handle latest order data
  private handleLatestOrder(cart: CartModel): Observable<Info> {
    return this.orderService.getLatestOrder(cart._id).pipe(
      take(1),
      map(order => {
        const loginInfo = this.handleOrderDataFormat(order)
        return loginInfo
      })
    )
  }

  private handleCartDataFormat(cart, price): Info {
    const loginInfo: Info = {
      new: false,
      messageDate: "You have Open Cart from",
      date: cart.createDate,
      messagePrice: "Your current cart price is",
      price: price,
    }
    return loginInfo
  }

  private handleOrderDataFormat(order): Info {
    const loginInfo: Info = {
      new: false,
      messageDate: "You Last Purchase was in",
      date: order.orderDate,
      messagePrice: "For",
      price: order.totalPrice,
    }
    return loginInfo
  }



}
