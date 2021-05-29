import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { CartService } from 'src/app/services/cart.service';

import { CartModel } from '../models/cart.model';
import { UserModel } from '../models/user.model';
import { CartItemModel } from '../models/cart-item-model';

import { CartItemService } from 'src/app/services/cart-item.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartState } from '../ngrx/state/cart-state';
import * as CartActions from '../ngrx/actions/cart-action'

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
    private authService: AuthService,

    private ngrxStore: Store<CartState>,
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CartModel> | Observable<CartModel> | any {

    this.isLogin = this.authService.auth.isLogin
    this.user = this.authService.auth.user
    this.sessionCart = CartModel.getSessionCart()

    // login with temp cart
    if (this.isLogin && this.sessionCart?.getItems().length > 0) {

      return this.cartService.getCart(this.user._id)
        .pipe(
          // format cart items array
          map((cart: CartModel) => {

            const items: CartItemModel[] = this.cartItemsService.setCartItemsAsCurrentItems(this.sessionCart.getItems(), cart.get_id())
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
