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
import { PaginationDataModel, PaginationModel } from '../models/pagination-model';

export interface ProductData {
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
  public handleUpdate = new BehaviorSubject<ProductData | null>(null)
  public productsSubject = new BehaviorSubject<ProductModel[]>([]);
  public productsCols = new Subject<boolean>();
  public slice: number = 4;

  constructor(
    private http: HttpClient,
    private formService: FormService,
    private router: Router

  ) { }

  // GET total products in store

  public getTotalNumberOfProducts(): Observable<number> {
    return this.http.get<number>(this.baseUrl + "/total")
  }

  // POST products with pagination :  http://localhost:3000/api/products/pagination/:page/:limit",

  public getProductsPagination(page: number, limit: number, categoryId?: string, alias?: string): Observable<PaginationDataModel> {

    const pagination: string = `pagination/${page}/${limit}`

    return this.http.post<PaginationDataModel>(this.baseUrl + `/${pagination}`, { categoryId }).pipe(
      map(data => {

        data.pagination.pageIndex = data.pagination.pageIndex - 1

        if (alias) {
          this.handleProductsStoreState(data.products, data.pagination, alias)
        }

        if (!categoryId) {
          this.formatProductId(data.products)
        }

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

  // GET products categories : http://localhost:3000/api/products/categories
  public getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.baseUrl + "/categories").pipe(
      tap((response: CategoryModel[]) => {
        this.formService.handleStore(ActionType.GetCategories, response)
      })
    )
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

  public formatProductsArray(response: ProductModel[], cols: number): [ProductModel[]] {
    const collection: any = []
    const temp = [...response]
    for (let i = 0; i < response.length;) {
      const row: ProductModel[] = temp.splice(0, cols)
      collection.push(row)
      i = i + cols
    }
    return collection
  }

  private formatProductId(products) {
    for (const key in products) {
      products[key]._id = (parseInt(key) + 1).toString()
    }
  }

  public handleProductsStoreState(products: ProductModel[], pagination: PaginationModel, alias: string): void {

    const storeProducts = store.getState().products[alias].products

    if (storeProducts.length === 0) {
      this.formService.handleStore(ActionType.SetProductsPaginationData, { products, pagination, alias })

    } else if (storeProducts.length < pagination.length) {
      this.formService.handleStore(ActionType.AddProductsPaginationData, { products, pagination, alias })
    }
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
