import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { PageModel } from '../models/pagination-model';
import { ProductsService } from 'src/app/feat-modules/products/products.service';

@Injectable({
  providedIn: 'root'
})
export class PaginationResolver implements Resolve<any>{

  private subscribtion: Subscription
  constructor(
    private productService: ProductsService,

  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PageModel> | Promise<PageModel> | PageModel {

    const categoryId: string = route.params.categoryId
    const alias: string = route.params.alias


    return of()

  }
}
