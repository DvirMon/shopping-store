import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OrderHistoryModel } from '../utilities/models/order-model';
import { ProductModel } from '../utilities/models/product-model';
import { OrderService } from './order.service';
import { ProductsService } from './products.service';

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
    private http: HttpClient,
  ) { }



  // HTTP SECTION

  // GET request - get search products : http://localhost:3000/api/products/search/:query
  public searchProducts(control: FormControl): Observable<ProductModel[]> {

    return this.search(control).pipe(
      switchMap((query: string) => {

        if (!query) {
          return this.handleError()
        }

        return this.http.get<ProductModel[]>(this.productUrl + `/${query}`).pipe(
          tap((products: ProductModel[]) => {

            if (products.length === 0) {
              return this.handleError()
            }
            return this.handleProducts(products)
          })
        )
      }))
  }

  // GET request - get search products : http://localhost:3000/api/products/search/:query
  public searchOrders(control: FormControl, userId: string): Observable<OrderHistoryModel[]> {

    return this.search(control).pipe(
      switchMap((query: string) => {

        if (!query) {
          return this.handleError()
        }

        return this.http.get<OrderHistoryModel[]>(this.ordersUrl + `/${userId}` + `/${query}`).pipe(
          tap((orders: OrderHistoryModel[]) => {

            if (orders.length === 0) {
              return this.handleError()
            }
            return this.handleOrders(orders)
          })
        )
      })
    )
  }


  // LOGIC SECTION

  // main method for serach
  private search(control: FormControl): Observable<string> {

    return control.valueChanges.pipe(
      debounceTime(600),
      map((value: string) => value.length >= 3 ? value : null),
      distinctUntilChanged(),
      switchMap((query: string) => {

        if (!query || !query.trim() || this.validFormat(query)) {
          return of(null)
        }
        return of(query)
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
    return of(orders)

  }





}
