import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../utilities/models/product-model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url: string = `${environment.server}/api/products/search`

  private handleSearchEntries = new BehaviorSubject<ProductModel[]>([]);
  public serachEntries$: Observable<ProductModel[]> = this.handleSearchEntries.asObservable()

  private handlerRsults: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public results$: Observable<boolean> = this.handlerRsults.asObservable()


  constructor(
    private http: HttpClient
  ) { }



  // HTTP SECTION

  // GET request - get search products : http://localhost:3000/api/products/search/:query
  public searchProducts(query: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.url + `/${query}`).pipe(
      tap((products: ProductModel[]) => {

        if (products.length === 0) {
          return this.handleError()
        }
        return this.handleSuccess(products)
      })
    )
  }


  // LOGIC SECTION

  // main method for serach
  public search(searchControl): Observable<ProductModel[]> {

    return searchControl.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(), 
      switchMap((searchTerm: string) => {
        if (!searchTerm || !searchTerm.trim() || this.validFormat(searchTerm)) {
          return this.handleError()
        }
        return this.searchProducts(searchTerm.trim().toLocaleLowerCase())
      }))
  }

    // prevent search with special symbols
    private validFormat(searchTerm: string): boolean {
      const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      return regex.test(searchTerm)
    }



  // handle search error
  private handleError(): Observable<[]> {
    this.handlerRsults.next(true)
    this.handleSearchEntries.next([]);
    return of([]);
  }

  // handle search success
  private handleSuccess(products: ProductModel[]): Observable<ProductModel[]> {
    this.handlerRsults.next(false)
    this.handleSearchEntries.next(products);
    return of(products)
  }





}
