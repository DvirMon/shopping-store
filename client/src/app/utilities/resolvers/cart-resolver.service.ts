import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { CartService } from 'src/app/services/cart.service';

import { CartModel } from '../models/cart-model';
import { UserModel } from '../models/user-model';

import { store } from '../redux/store';

import { cartState } from '../ngrx/state/cart-state';
import * as CartActions from '../ngrx/action'

@Injectable({
  providedIn: 'root'
})
export class CartResolver implements Resolve<any> {


  private user: UserModel
  private isLogin: boolean
  private sessionCart: CartModel

  constructor(
    private cartService: CartService,
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

    console.log(this.sessionCart)

    if (this.isLogin) {

      console.log(this.sessionCart)

      if (this.sessionCart?.getItems().length > 0) {

        console.log(1)

        return this.cartService.getCart(this.user._id).pipe(
          switchMap((cart: CartModel) => {

            cart.setItems(this.sessionCart.getItems())

            return this.cartService.updateCart(cart)
          })
        )
      }

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
