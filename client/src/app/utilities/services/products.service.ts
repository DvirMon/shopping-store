import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ProductModel } from '../models/product-model';
import { CategoryModel } from '../models/category-model';

import { FormService } from './form.service';

import { config } from '../../../main-config'
import { store } from 'src/app/utilities/redux/store';
import { ActionType } from 'src/app/utilities/redux/action-type';


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

  public getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.baseUrl + "/categories").pipe(
      tap((response: CategoryModel[]) => {
        this.formService.handleStore(ActionType.GetCategories, response)
      })
    )
  }

  public getProductsByCategory(categoryId : string, alias : string): Observable<ProductModel[]> {
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

  public handleProductsStoreState(products: ProductModel[], alias : string) {
    this.formService.handleStore(ActionType.GetProducts, { products, alias })
  }

  public addProductToStore(product: ProductModel, alias : string) {
    this.formService.handleStore(ActionType.AddProduct, { product, alias })
  }


}
