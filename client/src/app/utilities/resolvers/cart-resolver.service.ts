import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CartModel } from '../models/cart-model';
import { UserModel } from '../models/user-model';
import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class CartResolver implements Resolve<any> {

  private user : UserModel = store.getState().auth.user

  constructor(
    private cartService: CartService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CartModel> | Observable<CartModel> | any {

    if (this.user) {
      return this.cartService.getLatestCart(this.user._id)
    }

  }
}
