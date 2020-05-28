import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ProductModel } from '../models/product-model';

import { FormService } from './form.service';


import { config } from '../../../main-config'
import { store } from 'src/app/utilities/redux/store';
import { ActionType } from 'src/app/utilities/redux/action-type';
import { CategoryModel } from '../models/category-model';


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

  constructor(
    private http: HttpClient,
    private formService: FormService

  ) { }

  public getProductsCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.baseUrl + "/categories").pipe(
      tap((response: CategoryModel[]) => {
        this.formService.handleStore(ActionType.GetCategories, response)
      })
    )
  }

  public getProductNameAndImage(_id) {
    return this.http.get(this.baseUrl + `/${_id}`).pipe(
      map((product: ProductModel) => {
        return product
      })
    )
  }

  public getProductsByCategory(categoryId): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl + `/category/${categoryId}`).pipe(
      map(response => {
        this.handleProductsStoreState(response);
        return response;
      })
    ) 
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

  public handleProductsStoreState(products: ProductModel[]) {
    const category = store.getState().products.categories.find(category => category._id === products[0].categoryId)
    this.formService.handleStore(ActionType.GetProducts, { alias: category.alias, products })
  }

  public addProductToStore(product: ProductModel) {
    const category = store.getState().products.categories.find(category => category._id === product.categoryId)
    this.formService.handleStore(ActionType.AddProduct, { alias: category.alias, product })
  }


}
