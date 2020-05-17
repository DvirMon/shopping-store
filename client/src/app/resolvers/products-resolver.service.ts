import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductsService, Product } from '../services/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<Observable<Product[]> | Promise<Product[]> | Product[]>{

  constructor(
    private productService: ProductsService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> | Promise<Product[]> | Product[] {
    return this.productService.getProductsByCategory(route.params.categoryId)
  }
}
