import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/cart/components/cart-list/cart.service';
import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class InfoResolver implements Resolve<any> {

  private isLogin = store.getState().auth.isLogin

  constructor(
    private cartService : CartService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<string> | any {

    if(this.isLogin) {

    }

    // return this.infoService.getNotification(route.params.userId)
  }
}
