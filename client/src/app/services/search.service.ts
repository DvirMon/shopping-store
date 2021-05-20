import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OrderHistoryModel } from '../utilities/models/order-model';
import { ProductModel } from '../utilities/models/product-model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private productUrl: string = `${environment.server}/api/products/search`
  private ordersUrl: string = `${environment.server}/api/orders/search`

  private productsSearchEntries = new BehaviorSubject<ProductModel[]>([]);
  public productsEntries$: Observable<ProductModel[]> = this.productsSearchEntries.asObservable()

  private ordersSearchEntries = new BehaviorSubject<OrderHistoryModel[]>([]);
  public orderEntries$: Observable<OrderHistoryModel[]> = this.ordersSearchEntries.asObservable()

  private handlerRsults: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public results$: Observable<boolean> = this.handlerRsults.asObservable()


  constructor(
    private http: HttpClient
  ) { }



  // HTTP SECTION

  // GET request - get search products : http://localhost:3000/api/products/search/:query
  public searchProducts(query: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.productUrl + `/${query}`).pipe(
      tap((products: ProductModel[]) => {

        if (products.length === 0) {
          return this.handleError()
        }
        return this.handleProducts(products)
      })
    )
  }

  // GET request - get search products : http://localhost:3000/api/products/search/:query
  public searchOrders(userId: string, query: string): Observable<OrderHistoryModel[]> {
    return this.http.get<OrderHistoryModel[]>(this.ordersUrl + `/${userId}` + `/${query}`).pipe(
      tap((orders: OrderHistoryModel[]) => {

        if (!query || !query.trim() || this.validFormat(query)) {
          return this.handleError()
        }
        if (orders.length === 0) {
          return this.handleError()
        }
        return this.handleOrders(orders)
      })
    )
  }


  // LOGIC SECTION

  // main method for serach
  public search(searchControl): Observable<ProductModel[]> {

    return searchControl.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((query: string) => {
        if (!query || !query.trim() || this.validFormat(query)) {
          return this.handleError()
        }
        return this.searchProducts(query.trim().toLocaleLowerCase())
      }))
  }

  // prevent search with special symbols
  private validFormat(query: string): boolean {
    const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return regex.test(query)
  }



  // handle search error
  private handleError(): Observable<[]> {
    this.handlerRsults.next(true)
    this.productsSearchEntries.next([]);
    this.ordersSearchEntries.next([]);
    return of([]);
  }

  // handle search success
  private handleProducts(products: ProductModel[]): Observable<ProductModel[]> {
    this.handlerRsults.next(false)
    this.productsSearchEntries.next(products);
    return of(products)
  }

  private handleOrders(orders: OrderHistoryModel[]): Observable<OrderHistoryModel[]> {
    this.handlerRsults.next(false)
    this.ordersSearchEntries.next(orders);
    console.log(orders)
    return of(orders)

  }





}
