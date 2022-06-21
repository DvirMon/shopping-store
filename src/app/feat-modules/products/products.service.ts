import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { ProductModel } from './product-model';

import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ActionType } from 'src/app/utilities/redux/action-type';

import { environment } from 'src/environments/environment';
import { UntypedFormControl } from '@angular/forms';

// NGRX
import { Store } from '@ngrx/store';
import { categoriesSelector } from 'src/app/utilities/ngrx/selectors';
import { ProductsState } from 'src/app/utilities/ngrx/state/products-state';
import { SearchService } from 'src/app/services/search.service';
import { store } from 'src/app/utilities/redux/store';
import { FormService } from 'src/app/services/form.service';
import { CategoryModel } from 'src/app/utilities/models/category-model';
import { PageModel } from 'src/app/utilities/models/pagination-model';

export interface PageData {
  page: number
  limit: number,

}

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private url: string = `${environment.server}/api/products`

  public products$ = this.storeNgrx.select('products');
  public categories$: Observable<CategoryModel[]> = this.storeNgrx.select(categoriesSelector)

  public handleUpdate = new BehaviorSubject<ProductModel>(null)
  public handleDrawerToggle = new Subject<boolean>();

  // category alias
  public CategoryAlias = new BehaviorSubject<string>("");
  public alias$: Observable<string> = this.CategoryAlias.asObservable();

  public productsSearchEntries = new BehaviorSubject<ProductModel[]>([]);
  public searchEntries$: Observable<ProductModel[]> = this.productsSearchEntries.asObservable()

  constructor(
    private http: HttpClient,
    private formService: FormService,
    private searchService: SearchService,
    private storeNgrx: Store<{ products: ProductsState }>

  ) {



  }

  // HTTP SECTION

  // GET request - total products in store : http://localhost:3000/api/products/total
  public getTotalNumberOfProducts(): Observable<number> {
    return this.http.get<number>(this.url + "/total")
  }

  // POST request - get products with pagination :  http://localhost:3000/api/products/pagination/:page/:limit",
  public getProductsPage(page: PageData, categoryId?: string, alias?: string) {
    return this.http.post<PageModel>(this.url + `/pagination/${page.page}/${page.limit}`, { categoryId }).pipe(
      map(({ products, pagination }) => {
        const page = new PageModel(products, pagination, alias, [])
        page.pagination.pageIndex = page.pagination.pageIndex - 1
        page.pages.push(page.pagination.pageIndex)
        return page
      })
    )
  }

  // method to get first products
  public getFirstPage(categoryId: string, alias: string) {
    this.getProductsPage({ page: 1, limit: 6 }, categoryId, alias).subscribe(
      (page) => {
        if (alias) {
          // this.storeNgrx.dispatch(ProductsActions.SetPage({ page, alias }))
        }
      }
    )
  }

  public addProductsPage(page: PageData, categoryId?: string, alias?: string) {
    this.getProductsPage(page, categoryId, alias).subscribe(
      (page) => {
        // this.storeNgrx.dispatch(new ProductsActions.AddPage({ page, alias }))
      })
  }


  // GET request - get search products : http://localhost:3000/api/products/search/:query
  private searchProducts(query: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.url + `/search/${query}`)
  }

  // GET request - products categories : http://localhost:3000/api/products/categories
  public getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.url + "/categories").pipe(
      map((response: CategoryModel[]) => {

        const categories = response.map(category => {
          category.hide = true
          return category
        })

        // this.storeNgrx.dispatch(new ProductsActions.SetCategories(categories))

        return categories
      })
    )
  }

  // ADMIN ACTIONS SECTION

  // POST request - add product : http://localhost:3000/api/products
  public addProduct(data: FormData | ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.url, data)
  }

  // PUT request - update product : http://localhost:3000/api/products/:_id
  public updateProduct(data: FormData | ProductModel, _id: string): Observable<ProductModel> {
    return this.http.put<ProductModel>(this.url + `/${_id}`, data)
  }


  // LOGIC SECTION

  private handleProductsStoreState(page: PageModel, alias: string): void {

    const currentPage: PageModel = store.getState().products[alias]

    if (!currentPage) {
      // this.formService.handleStore(ActionType.SetProductsPaginationData, page)

      // this.storeNgrx.dispatch(new ProductsActions.SetPage({ page, alias }))

    } else if (currentPage.products.length < page.pagination.length) {
      console.log("add")
      // this.formService.handleStore(ActionType.AddProductsPaginationData, page)

      // this.storeNgrx.dispatch(new ProductsActions.AddPage({ page, alias }))
    }
  }

  // add product to store
  public addProductToStore(product: ProductModel, alias: string): void {
    this.formService.handleStore(ActionType.AddProduct, { product, alias })
  }

  // update product in store
  public updateProductToStore(product: ProductModel, alias: string): void {
    this.formService.handleStore(ActionType.UpdateProduct, { product, alias })
  }



  // serach products method
  public search(control: UntypedFormControl): Observable<ProductModel[]> {

    return this.searchService.search(control).pipe(
      switchMap((query: string) => {

        if (!query) {
          this.productsSearchEntries.next([])
          return of([])
        }

        return this.searchProducts(query).pipe(
          tap((products: ProductModel[]) => {

            if (products.length === 0) {
              return this.handleError()
            }
            return this.handleSuccess(products)
          })
        )
      }))
  }

  // get screen size
  public isMobile(): Observable<boolean> {
    return this.formService.isMobile()
  }

  // SUBJECT SECTION

  // handle search error
  private handleError(): Observable<[]> {
    this.searchService.handlerRsults.next(true)
    this.productsSearchEntries.next([])
    return of([]);
  }

  // handle search success
  private handleSuccess(products: ProductModel[]): Observable<ProductModel[]> {
    this.searchService.handlerRsults.next(false)
    this.productsSearchEntries.next(products)
    return of(products)
  }

}
