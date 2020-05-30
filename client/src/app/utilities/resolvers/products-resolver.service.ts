import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CategoryModel } from '../models/category-model';
import { store } from '../redux/store';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<Observable<ProductModel[]> | Promise<ProductModel[]> | ProductModel[]>{

  constructor(
    private productService: ProductsService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductModel[]> | Promise<ProductModel[]> | ProductModel[] {

    const categoryId = route.params.categoryId
    const alias =route.params.alias

    if (store.getState().products[alias].length === 0) {
      return this.productService.getProductsByCategory(categoryId, alias)
    }
    else {
      return store.getState().products[alias]
    }
  }
}
