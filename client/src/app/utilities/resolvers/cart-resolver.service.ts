import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CartModel } from '../models/cart-model';
import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class CartResolver implements Resolve<any> {

  private isLogin: boolean = store.getState().auth.isLogin

  constructor(
    private cartService: CartService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CartModel> | Observable<CartModel> | any {

    if (this.isLogin) {
      return this.cartService.getLatestCart(route.params.userId)
    }

  }
}
