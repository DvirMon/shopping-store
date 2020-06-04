import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { ProductModel } from '../models/product-model';
import { CategoryModel } from '../models/category-model';
import { FormService } from './form.service';

import { ActionType } from 'src/app/utilities/redux/action-type';

import { config } from '../../../main-config'
import { store } from '../redux/store';

export interface UpdateData {
  product: ProductModel,
  alias: string
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
  public handleUpdate = new BehaviorSubject<UpdateData | null>(null)
  public slice: number = 4;

  constructor(
    private http: HttpClient,
    private formService: FormService,
    private router: Router

  ) { }

  // GET products categories : http://localhost:3000/api/products
  public getPageProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl).pipe(
      map(products => {
        for (const key in products) {
          products[key]._id = (parseInt(key) + 1).toString()
          this.formService.handleStore(ActionType.GetAllProducts, products)
        }
        return products
      })
    )
  }

  // GET products categories : http://localhost:3000/api/products/categories
  public getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.baseUrl + "/categories").pipe(
      tap((response: CategoryModel[]) => {
        this.formService.handleStore(ActionType.GetCategories, response)
      })
    )
  }

  // GET products by category : http://localhost:3000/api/products/category:categoryId
  public getProductsByCategory(categoryId: string, alias: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl + `/category/${categoryId}`).pipe(
      tap(products => {
        this.handleProductsStoreState(products, alias);
        return products;
      })
    )
  }

  // GET products with pagination :  http://localhost:3000/api/products/:categoryId/pagination/:page/:limit",

  public getProductsPagination(categoryId: string, page: number, limit: number, alias: string) {

    const pagination: string = `pagination/${page}/${limit}`

    return this.http.get(this.baseUrl + `/category/${categoryId}/${pagination}`).pipe(
      tap(data => {
        // this.handleProductsStoreState(products, alias);
        return data
      })
    )


  }

  // Get product : http://localhost:3000/api/products/:_id
  public getProductNameAndImage(_id): Observable<ProductModel> {
    return this.http.get<ProductModel>(this.baseUrl + `/${_id}`)
  }

  // GET products : http://localhost:3000/api/products/search/:query
  public searchProducts(query: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl + `/search/${query}`)
  }

  // admin actions

  // POST product : http://localhost:3000/api/products
  public addProduct(data: FormData | ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.baseUrl, data)
  }

  // PUT product : http://localhost:3000/api/products/:_id
  public updateProduct(data: FormData | ProductModel, _id: string): Observable<ProductModel> {
    return this.http.put<ProductModel>(this.baseUrl + `/${_id}`, data)
  }

  // end of requests section

  // logic section 

  public formatProductsArray(response: ProductModel[]): [ProductModel[]] {
    const collection: any = []
    const temp = [...response]
    for (let i = 0; i < response.length;) {
      const row: ProductModel[] = temp.splice(0, this.slice)
      collection.push(row)
      i = i + this.slice
    }
    return collection
  }

  public handleProductsStoreState(products: ProductModel[], alias: string): void {
    this.formService.handleStore(ActionType.GetProducts, { products, alias })
  }

  public addProductToStore(product: ProductModel, alias: string): void {
    this.formService.handleStore(ActionType.AddProduct, { product, alias })
  }

  public updateProductToStore(product: ProductModel, alias: string): void {
    this.formService.handleStore(ActionType.UpdateProduct, { product, alias })
  }

  public productsLandingPage(): Promise<boolean> {
    return this.router.navigateByUrl(`${config.baseProductUrl}`)
  }

  public getCategoryAlias(product): string {
    const categories = store.getState().products.categories
    const alias = categories.find(category => category._id === product.categoryId).alias
    return alias
  }


}
