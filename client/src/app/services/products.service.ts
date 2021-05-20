import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { PaginationDataModel, PaginationModel } from '../utilities/models/pagination-model';

import { ProductModel } from '../utilities/models/product-model';
import { CategoryModel } from '../utilities/models/category-model';
import { FormService } from './form.service';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { store } from '../utilities/redux/store';
import { ActionType } from 'src/app/utilities/redux/action-type';

import { environment } from 'src/environments/environment';



export interface ProductCartInfo {
  name: string
  imagePath: string,

}

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private url: string = `${environment.server}/api/products`

  public handleUpdate = new BehaviorSubject<ProductModel>(null)
  public handleSearchEntries = new BehaviorSubject<ProductModel[]>([]);
  public handleDrawerToggle = new Subject<boolean>();

  public handleCateogryAlias = new BehaviorSubject<string>("");
  public alias$ : Observable<string> = this.handleCateogryAlias.asObservable();


  // public productLandingPage: string = environment.productLandingPage

  constructor(
    private http: HttpClient,
    private formService: FormService,
    private router: Router

  ) { }

  // GET request - total products in store : http://localhost:3000/api/products/total

  public getTotalNumberOfProducts(): Observable<number> {
    return this.http.get<number>(this.url + "/total")
  }

  // POST request - get products with pagination :  http://localhost:3000/api/products/pagination/:page/:limit",

  public getProductsPagination(page: number, limit: number, categoryId?: string, alias?: string): Observable<PaginationDataModel> {

    const pagination: string = `pagination/${page}/${limit}`

    return this.http.post<PaginationDataModel>(this.url + `/${pagination}`, { categoryId }).pipe(
      map(data => {
        data.pagination.pageIndex = data.pagination.pageIndex - 1

        if (alias) {
          this.handleProductsStoreState(data.products, data.pagination, alias)
        }

        return data
      })
    )
  }


  // GET request - get search products : http://localhost:3000/api/products/search/:query
  public searchProducts(query: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.url + `/search/${query}`)
  }

  // GET request - products categories : http://localhost:3000/api/products/categories
  public getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.url + "/categories").pipe(
      map((response: CategoryModel[]) => {

        const categories = response.map(category => {
          category.icon = ""
          category.hide = true
          return category
        })



        this.formService.handleStore(ActionType.GetCategories, categories)
        return categories
      })
    )
  }

  // admin actions

  // POST request - add product : http://localhost:3000/api/products
  public addProduct(data: FormData | ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.url, data)
  }

  // PUT request - update product : http://localhost:3000/api/products/:_id
  public updateProduct(data: FormData | ProductModel, _id: string): Observable<ProductModel> {
    return this.http.put<ProductModel>(this.url + `/${_id}`, data)
  }

  // end of requests section

  // logic section


  private handleProductsStoreState(products: ProductModel[], pagination: PaginationModel, alias: string): void {

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

  // navigate to products landing page
  public productsLandingPage(): Promise<boolean> {
    return this.router.navigateByUrl(environment.productLandingPage)
  }

  // get product category alias
  public getCategoryAlias(product: ProductModel): string {
    const categories = store.getState().products?.categories
    if (product) {
      return categories.find(category => category._id === product.categoryId).alias
    }
  }

  // get screen size
  public isMobile() {
    return this.formService.isMobile()
  }

}
