import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { store } from '../redux/store';
import { ProductModel } from '../models/product-model';
import { PaginationDataModel } from '../models/pagination-model';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<Observable<PaginationDataModel> | Promise<PaginationDataModel> | PaginationDataModel>{

  constructor(
    private productService: ProductsService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PaginationDataModel> | Promise<PaginationDataModel> | PaginationDataModel {

    const categoryId = route.params.categoryId
    const alias = route.params.alias

    // if (store.getState().products[alias].length === 0) {
    //   return this.productService.getProductsByCategory(categoryId, alias)
    // }
    // else {
    //   return store.getState().products[alias]
    // }

    return this.productService.getProductsPagination(1, 8, categoryId, alias)
  }
}
