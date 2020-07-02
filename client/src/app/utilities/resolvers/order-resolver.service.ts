import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { OrderService } from '../services/order.service';

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<number[]> {
 
  constructor(
    private orderService : OrderService
  ) {

  }

  resolve( 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<number[]> | Observable<number[]> | any {
    return this.orderService.getOccupiedDates()
  }
}
