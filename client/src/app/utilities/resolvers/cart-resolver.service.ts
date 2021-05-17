import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { CartService } from 'src/app/services/cart.service';

import { CartModel } from '../models/cart-model';
import { UserModel } from '../models/user-model';

import { store } from '../redux/store';

import { cartState } from '../ngrx/state/cart-state';
import * as CartActions from '../ngrx/actions/cart-action'
import { CartItemModel, CurrentItemModel } from '../models/cart-item-model';
import { CartItemService } from 'src/app/services/cart-item.service';

@Injectable({
  providedIn: 'root'
})
export class CartResolver implements Resolve<any> {


  private user: UserModel
  private isLogin: boolean
  private sessionCart: CartModel

  constructor(
    private cartService: CartService,
    private cartItemsService: CartItemService,
    private ngrxStore: Store<{ cart: typeof cartState }>,
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CartModel> | Observable<CartModel> | any {

    this.isLogin = store.getState().auth.isLogin
    this.user = store.getState().auth.user
    this.sessionCart = CartModel.getSessionCart()

    // login with temp cart
    if (this.isLogin && this.sessionCart?.getItems().length > 0) {

      return this.cartService.getCart(this.user._id)
        .pipe(
          // format cart items array
          map((cart: CartModel) => {
            const items: CartItemModel[] = this.cartItemsService.setCartItemsAsCurrentItems(this.sessionCart)
            return { cart, items }
          }),
          // add cart items in database
          switchMap(({ cart, items }) => {
            return this.cartItemsService.addItems(cart, items)
          }),
          // get cart with items
          switchMap((cart) => {
            // get cart with items
            return this.cartItemsService.getCurentCartItems(cart)
          }),
          tap((cart: CartModel) => {
            this.ngrxStore.dispatch(new CartActions.AddCart(cart))
            sessionStorage.removeItem("cart")
          })
        )
    }

    else if (this.isLogin) {

      return this.cartService.getCart(this.user._id).pipe(
        tap((cart: CartModel) => {
          this.ngrxStore.dispatch(new CartActions.AddCart(cart))
        })
      )
    }

    else {
      this.cartService.createTempCart()
    }
  }
}
