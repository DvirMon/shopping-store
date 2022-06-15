import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductsService } from '../../products/products.service';
import { CategoryModel } from '../models/category-model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolver implements Resolve<any>{

  constructor(
    private productService: ProductsService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    // this.productService.getCategories().subscribe()


    this.productService.categories$.subscribe(
      (categories: CategoryModel[]) => {
        if (categories.length === 0) {
          this.productService.getCategories().subscribe()
        }
      })

  }
}
