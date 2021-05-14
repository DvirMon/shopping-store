import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { CartModel } from '../models/cart-model';
import { UserModel } from '../models/user-model';
import { cartState } from '../ngrx/state/cart-state';
import { store } from '../redux/store';
import * as CartActions from '../ngrx/action'

@Injectable({
  providedIn: 'root'
})
export class CartResolver implements Resolve<any> {

  private user: UserModel = store.getState().auth.user

  constructor(
    private cartService: CartService,
    private ngrxStore: Store<{ cart: typeof cartState }>,
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CartModel> | Observable<CartModel> | any {

    if (this.user) {
      return this.cartService.getLatestCart(this.user._id).pipe(
        tap((cart: CartModel) => {
          this.ngrxStore.dispatch(new CartActions.AddCart(cart))
        })
      )
    }

  }
}
