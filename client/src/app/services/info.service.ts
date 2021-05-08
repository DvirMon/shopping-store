import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { forkJoin } from 'rxjs'
import { switchMap, take, map } from 'rxjs/operators'

import { CartModel, CurrentCartModel } from '../utilities/models/cart-model';

import { OrderService } from './order.service';
import { CartService } from './cart.service';
import { ProductsService } from './products.service';
import { FormService } from './form.service';

import { ActionType } from 'src/app/utilities/redux/action-type';
import { CartItemModel, CurrentItemModel } from '../utilities/models/cart-item-model';

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

    console.log(1)

    return this.cartService.getLatestCart(userId).pipe(
      take(1),
      switchMap(cart => {
        if (cart === null) {
          return this.handleNewClient()
        }
        // this.formService.handleStore(ActionType.IsCartActive, cart.getIsActive())

        if (cart.getIsActive()) {
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
  private handleCurrentCart(cart: CartModel): Observable<any> {

    this.formService.handleStore(ActionType.AddCart, cart)

    return this.cartService.getLatestCartItems(cart.get_id()).pipe(

      // get current cart products
      switchMap((cartItems: CurrentItemModel[]) => {

        if (cartItems.length === 0) {
          return of()
        }

        this.productsService.getProductOfCurrentCart(this.getProductsIds(cartItems))
        return of()

      }),

      // save cart data in store and handle current cart data
      map((response: CurrentCartModel) => {
        this.formService.handleStore(ActionType.SetCartItems, response.cartItems)
        this.formService.handleStore(ActionType.SetCartPrice, response.price)
        return this.handleCartDataFormat(cart, response.price)
      }),
    )
  }


  private getProductsIds(currentItems: CurrentItemModel[]): string[] {
    let productsIds: string[] = []
    currentItems.map(currentItem => productsIds.push(currentItem.productRef._id))
    return productsIds
  }

  // handle latest order data
  private handleLatestOrder(cart: CartModel): Observable<Info> {
    return this.orderService.getLatestOrder(cart.get_id()).pipe(
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
