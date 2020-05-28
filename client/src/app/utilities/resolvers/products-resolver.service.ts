import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CategoryModel } from '../models/category-model';
import { store } from 'src/app/utilities/redux/store';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<Observable<CategoryModel[]> | Promise<CategoryModel[]> | CategoryModel[]>{

  constructor(
    private productService: ProductsService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CategoryModel[]> | Promise<CategoryModel[]> | CategoryModel[] {

    if (store.getState().products.categories.length === 0) {
      return this.productService.getProductsCategories()
    } else {
      return store.getState().products.categories
    }
  }
}
