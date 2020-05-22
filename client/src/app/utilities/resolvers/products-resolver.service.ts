import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductsService } from '../services/products.service';
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
    return this.productService.getProductsByCategory(route.params.categoryId)
  }
}
 