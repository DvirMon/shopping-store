import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ProductModel } from '../models/product-model';
import { CategoryModel } from '../models/category-model';
import { FormService } from './form.service';

import { ActionType } from 'src/app/utilities/redux/action-type';

import { config } from '../../../main-config'

export interface ProductsData {
  products: ProductModel[],
  category: CategoryModel
}

export interface ProductCartInfo {
  name: string
  imagePath: string,

}

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  public baseUrl: string = `http://localhost:${config.port}/api/products`
  public productToUpdate = new Subject<ProductModel>()

  constructor(
    private http: HttpClient,
    private formService: FormService,
    private router: Router

  ) { }

  public getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.baseUrl + "/categories").pipe(
      tap((response: CategoryModel[]) => {
        this.formService.handleStore(ActionType.GetCategories, response)
      })
    )
  }

  public getProductsByCategory(categoryId: string, alias: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl + `/category/${categoryId}`).pipe(
      tap(products => {
        this.handleProductsStoreState(products, alias);
        return products;
      })
    )
  }

  public getProductNameAndImage(_id): Observable<ProductModel> {
    return this.http.get<ProductModel>(this.baseUrl + `/${_id}`)
  }

  public searchProducts(value: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl + `/search/${value}`)
  }

  // end of requests section

  // logic section 

  public formatProductsArray(response: ProductModel[]): [ProductModel[]] {
    const collection: any = []
    const temp = [...response]
    for (let i = 0; i < response.length;) {
      const row: ProductModel[] = temp.splice(0, 4)
      collection.push(row)
      i = i + 4
    }
    return collection
  }

  public handleProductsStoreState(products: ProductModel[], alias: string) {
    this.formService.handleStore(ActionType.GetProducts, { products, alias })
  }

  public productsLandingPage() {
    return this.router.navigateByUrl(`${config.baseProductUrl}`)
  }


}
