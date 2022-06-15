import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductsService } from 'src/app/feat-modules/products/products.service';
import { CategoryModel } from '../models/category-model';

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
